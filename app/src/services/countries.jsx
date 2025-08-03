export async function getCountries() {
    const res = await fetch('http://localhost:3000/countries/all');
    if (res.ok) {
        return await res.json();
    } else {
        throw new Error(`Failed to fetch countries. Upstream response status: ${res.status}`);
    }
}