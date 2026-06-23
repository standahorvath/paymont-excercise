/** Derive up to two uppercase initials from an email's local part. */
export const getInitials = (email: string) => {
  const [localPart = ""] = email.split("@")
  const segments = localPart.split(/[._-]+/).filter(Boolean)
  const initials = segments
    .slice(0, 2)
    .map((segment) => segment[0])
    .join("")
  return (initials || email[0] || "?").toUpperCase()
}
