const ALLOWED_HOSTS = new Set(["pixabay.com", "cdn.pixabay.com"]);

function isAllowed(url: URL): boolean {
  return url.protocol === "https:" && ALLOWED_HOSTS.has(url.hostname);
}

// Ikuti redirect secara manual supaya tujuan redirect juga divalidasi
async function fetchAllowed(url: URL, hops = 3): Promise<Response> {
  const res = await fetch(url, { redirect: "manual" });

  if (res.status >= 300 && res.status < 400) {
    const location = res.headers.get("location");
    if (!location || hops === 0) throw new Error("Redirect tidak valid");

    const next = new URL(location, url);
    if (!isAllowed(next)) throw new Error("Redirect ke host tidak diizinkan");
    return fetchAllowed(next, hops - 1);
  }
  return res;
}

export async function GET(request: Request) {
  const target = new URL(request.url).searchParams.get("url");
  if (!target)
    return new Response("Parameter url wajib diisi", { status: 400 });

  let upstream: URL;
  try {
    upstream = new URL(target);
  } catch {
    return new Response("URL tidak valid", { status: 400 });
  }

  if (!isAllowed(upstream)) {
    return new Response("Host tidak diizinkan", { status: 403 });
  }

  try {
    const res = await fetchAllowed(upstream);
    if (!res.ok)
      return new Response(`Upstream error ${res.status}`, { status: 502 });

    const contentType = res.headers.get("content-type") ?? "";
    if (!contentType.startsWith("image/")) {
      return new Response("Bukan file gambar", { status: 415 });
    }

    return new Response(res.body, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (e) {
    return new Response(
      e instanceof Error ? e.message : "Gagal mengambil gambar",
      {
        status: 502,
      },
    );
  }
}
