import { Toaster } from "react-hot-toast";

export default function ToasterComponent() {
  return (
    <Toaster
      position="top-center"
      gutter={12}
      containerStyle={{ margin: "8px" }}
      toastOptions={{
        success: {
          duration: 3000,
        },
        error: {
          duration: 5000,
        },
        style: {
          fontSize: "16px",
          maxWidth: "500px",
          padding: "16px 24px",
          backgroundColor: "#4CAF50", // Solid green for success
          color: "#FFFFFF", // White text
          borderRadius: "8px", // Optional: rounded corners
        },
        error: {
          style: {
            backgroundColor: "#F44336", // Solid red for errors
            color: "#FFFFFF", // White text
            borderRadius: "8px", // Optional: rounded corners
          },
        },
      }}
    />
  );
}
