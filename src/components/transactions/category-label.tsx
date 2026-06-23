import { useTranslation } from "react-i18next"

import { type TransactionCategory } from "@/enums"

type CategoryLabelProps = {
  category: TransactionCategory
}

export const CategoryLabel = ({ category }: CategoryLabelProps) => {
  const { t } = useTranslation("categories")
  return <>{t(category)}</>
}
