import { useTranslation } from "react-i18next"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type QueryErrorProps = {
  onRetry?: () => void
  className?: string
}

export const QueryError = ({ onRetry, className }: QueryErrorProps) => {
  const { t } = useTranslation("common")

  return (
    <div
      className={cn(
        "flex flex-col items-center gap-3 rounded-lg border border-dashed p-8 text-center",
        className,
      )}
    >
      <p className="text-sm text-muted-foreground">{t("error.loadFailed")}</p>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry}>
          {t("error.retry")}
        </Button>
      )}
    </div>
  )
}
