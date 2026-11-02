/**
 * Маршруты рекламной посадочной «Ремонт окон» (Яндекс.Директ).
 * Включает основной универсальный адрес (/remont-plastikovyh-okon/)
 * и прежние региональные адреса для сохранения совместимости.
 */
export const REPAIR_ROUTES = [
  "/remont-plastikovyh-okon",
  "/remont_plastikovyh_okon_vladivostok",
  "/regulirovka_plastikovykh_okon_vladivostok",
] as const;

export function isRepairPath(pathname: string | null | undefined): boolean {
  if (!pathname) return false;
  const clean = pathname.replace(/\/+$/, "");
  return REPAIR_ROUTES.some((r) => clean === r || clean.startsWith(`${r}/`));
}
