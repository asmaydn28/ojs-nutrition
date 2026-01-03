import { API_BASE_URL } from "./config";

export interface APIAddress {
  id: string;
  title: string;
  country_id: number;
  region_id: number;
  subregion_id: number;
  full_address: string;
  phone_number: string;
}

export interface CreateAddressRequest {
  title: string;
  first_name: string;
  last_name: string;
  country_id: number;
  region_id: number;
  subregion_id: number;
  full_address: string;
  phone_number: string;
}

export interface UpdateAddressRequest {
  title?: string;
  first_name?: string;
  last_name?: string;
  country_id?: number;
  region_id?: number;
  subregion_id?: number;
  full_address?: string;
  phone_number?: string;
}

export async function getAddresses(token: string, limit: number = 10, offset: number = 0): Promise<APIAddress[]> {
  const response = await fetch(`${API_BASE_URL}/users/addresses?limit=${limit}&offset=${offset}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Adresler alınırken bir hata oluştu (${response.status})`);
  }

  const json = await response.json();
  
  if (json.status === "success" && json.data?.results) {
    return json.data.results;
  }
  if (json.status === "success" && Array.isArray(json.data)) {
    return json.data;
  }
  if (Array.isArray(json)) {
    return json;
  }
  if (Array.isArray(json.results)) {
    return json.results;
  }
  return [];
}

export async function createAddress(token: string, data: CreateAddressRequest): Promise<APIAddress> {
  const response = await fetch(`${API_BASE_URL}/users/addresses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const json = await response.json();

  if (!response.ok) {
    let errorMessage = json.message || `Adres eklenirken bir hata oluştu (${response.status})`;
    if (json.reason && typeof json.reason === 'object') {
      const reasonMessages = Object.entries(json.reason).map(([key, value]) => {
        if (Array.isArray(value)) {
          return `${key}: ${value.join(", ")}`;
        }
        return `${key}: ${value}`;
      });
      errorMessage = reasonMessages.join("; ");
    }
    throw new Error(errorMessage);
  }

  if (json.status === "success" && json.data) {
    return json.data;
  }
  if (json.id) {
    return json;
  }
  throw new Error("Adres eklendi ancak sunucu yanıtı beklenen formatta değil");
}

export async function updateAddress(
  token: string,
  addressId: string,
  data: UpdateAddressRequest
): Promise<APIAddress> {
  const response = await fetch(`${API_BASE_URL}/users/addresses/${addressId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Adres güncellenirken bir hata oluştu" }));
    let errorMessage = error.message || `Adres güncellenirken bir hata oluştu (${response.status})`;
    if (error.reason && typeof error.reason === 'object') {
      const reasonMessages = Object.entries(error.reason).map(([key, value]) => {
        if (Array.isArray(value)) {
          return `${key}: ${value.join(", ")}`;
        }
        return `${key}: ${value}`;
      });
      errorMessage = reasonMessages.join("; ");
    }
    throw new Error(errorMessage);
  }

  const json = await response.json();
  return json.status === "success" && json.data ? json.data : json;
}

export async function deleteAddress(token: string, addressId: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/users/addresses/${addressId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Adres silinirken bir hata oluştu (${response.status})`);
  }
}

