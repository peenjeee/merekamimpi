import Swal from "sweetalert2"

// Success alert
export const showSuccessAlert = (title: string, message?: string) => {
  return Swal.fire({
    icon: "success",
    title: title,
    text: message,
    confirmButtonColor: "#1d365e",
  })
}

// Error alert
export const showErrorAlert = (title: string, message?: string) => {
  return Swal.fire({
    icon: "error",
    title: title,
    text: message,
    confirmButtonColor: "#1d365e",
  })
}

// Confirmation alert
export const showConfirmationAlert = (title: string, message: string, confirmText = "Yes", cancelText = "No") => {
  return Swal.fire({
    icon: "question",
    title: title,
    text: message,
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    confirmButtonColor: "#1d365e",
    cancelButtonColor: "#64748b",
  })
}

// Toast notification
export const showToast = (title: string, icon: "success" | "error" | "warning" | "info" = "success") => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer)
      toast.addEventListener("mouseleave", Swal.resumeTimer)
    },
  })

  return Toast.fire({
    icon,
    title,
  })
}
