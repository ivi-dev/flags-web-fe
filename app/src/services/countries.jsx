export async function getCountries() {
    const res = await fetch('https://localhost:444/api/countries/all');
    if (res.ok) {
        return await res.json();
    } else {
        throw new Error(`Failed to fetch countries. Upstream response status: ${res.status}`);
    }
}