import { Badge } from "@/components/ui/badge";
import type { Role } from "@/lib/types";

const labels: Record<Role, string> = {
  borrower: "Låner",
  librarian: "Bibliotekar",
};

/**
 * What a person is allowed to do. Quiet on purpose — a role is a fact about the
 * account, not a status that needs the accent colour.
 */
export function RoleBadge({
  role,
  className,
}: {
  role: Role;
  className?: string;
}) {
  return (
    <Badge variant="outline" className={className}>
      {labels[role]}
    </Badge>
  );
}

export function roleLabel(role: Role): string {
  return labels[role];
}
