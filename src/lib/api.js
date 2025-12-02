import axios from "axios";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE ||
  "https://autobizz-425913.uc.r.appspot.com";

// Get token
export async function getAuthorize() {
  const res = await axios.post(
    `${API_BASE}/getAuthorize`,
    { tokenType: "frontEndTest" },
    { headers: { "Content-Type": "application/json" } }
  );
  return res.data.token; // token string
}

// Get sales
export async function getSales({ token, params }) {
  const res = await axios.get(`${API_BASE}/sales`, {
    headers: { "X-AUTOBIZZ-TOKEN": token },
    params: {
      startDate: params.startDate || "",
      endDate: params.endDate || "",
      priceMin: params.minPrice || "",
      email: params.email || "",
      phone: params.phone || "",
      sortBy: params.sortBy || "date",
      sortOrder: params.sortOrder || "asc",
      after: params.after || "",
      before: params.before || "",
    },
  });
  return res.data;
}
