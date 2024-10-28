import { supabase } from "./supabase";

export const getGuests = async function () {
  const { data, error } = await supabase.from("Guests").select("*");

  if (error) {
    console.error(error);
    throw new Error("Guests could not be loaded");
  }

  return data;
};

export async function getGuest(email) {
  const { data, error } = await supabase
    .from("Guests")
    .select("*")
    .eq("email", email)
    .single();

  return data;
}

export async function createGuest(newGuest) {
  const { data, error } = await supabase.from("Guests").insert([newGuest]);

  if (error) {
    console.error(error);
    throw new Error("Guest could not be created");
  }

  return data;
}

export const getCities = async function (guestId) {
  const { data, error } = await supabase
    .from("Places")
    .select("*")
    .eq("guestId", guestId)
    .order("id", { ascending: true });

  if (error) {
    console.error(error);
    throw new Error("Cities could not be loaded");
  }

  return data;
};

export async function getCity(id) {
  const { data, error } = await supabase
    .from("Places")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("City not found");
  }

  return data;
}

// export async function createCity(newCity) {
//   const { data, error } = await supabase.from("Places").insert([newCity]);

//   if (error) {
//     throw new Error("City could not be created");
//   }
// }
