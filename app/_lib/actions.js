"use server";
import { parse } from "date-fns";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { redirect } from "next/navigation";
import { supabase } from "./supabase";

export async function signInAction() {
  await signIn("google", { redirectTo: "/map" });
}

export async function signOutAction() {
  await signOut("google", { redirectTo: "/" });
}

export async function createCity(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const newCity = {
    cityName: formData.get("cityName"),
    date: parse(formData.get("date"), "dd/MM/yyyy", new Date())
      .toISOString()
      .slice(0, 10),
    notes: formData.get("notes"),
    country: formData.get("country"),
    emoji: formData.get("emoji"),
    lat: formData.get("lat"),
    lng: formData.get("lng"),
    guestId: session.user.guestId,
    rating: Number(formData.get("rating")),
  };

  const { error } = await supabase
    .from("Places")
    .insert([newCity])
    .select()
    .single();

  if (error) {
    throw new Error("City could not be created");
  }

  revalidatePath("/map/cities");

  //for Toast

  // redirect("/map/cities");
  return { success: true };
}

export async function deleteCity(cityId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const { error } = await supabase
    .from("Places")
    .delete()
    .eq("id", cityId)
    .eq("guestId", session.user.guestId);

  if (error) {
    throw new Error("City could not be deleted");
  }

  revalidatePath("/map/cities");

  //for Toast
  return { success: true };
}
