/**
 * Маршруты рекламной посадочной «Ремонт окон» (Яндекс.Директ).
 * Используется, чтобы на этих страницах показывать ремонтные тексты
 * (а не «замер и установка новых окон») и не показывать акцию на лоджии.
 */
export const REPAIR_ROUTES = [
  "/remont_plastikovyh_okon_vladivostok",
  "/regulirovka_plastikovykh_okon_vladivostok",
] as const;

export function isRepairPath(pathname: string | null | undefined): boolean {
  if (!pathname) return false;
  const clean = pathname.replace(/\/+$/, "");
  return REPAIR_ROUTES.some((r) => clean === r || clean.startsWith(`${r}/`));
}
