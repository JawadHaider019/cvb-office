const ipRequestsMap = new Map();
export const adminFailedAttemptsMap = new Map();
export function getClientIp(req) {
    return (req.headers['x-forwarded-for']?.toString().split(',')[0].trim() ||
        req.socket.remoteAddress ||
        'unknown');
}
export function requestRateLimiter(req, res, next) {
    const clientIp = getClientIp(req);
    const now = Date.now();
    const oneHourAgo = now - 60 * 60 * 1000;
    const timestamps = (ipRequestsMap.get(clientIp) || []).filter((t) => t > oneHourAgo);
    if (timestamps.length >= 5) {
        ipRequestsMap.set(clientIp, timestamps);
        return res.status(429).json({
            success: false,
            error: 'Du hast zu viele Anfragen gesendet. Bitte versuche es in einer Stunde noch einmal.',
        });
    }
    timestamps.push(now);
    ipRequestsMap.set(clientIp, timestamps);
    next();
}
export function checkAdminLockout(req, res, next) {
    const clientIp = getClientIp(req);
    const attemptData = adminFailedAttemptsMap.get(clientIp) || { count: 0, lockUntil: null };
    if (attemptData.lockUntil && Date.now() < attemptData.lockUntil) {
        const minutesLeft = Math.ceil((attemptData.lockUntil - Date.now()) / (1000 * 60));
        return res.status(429).json({
            success: false,
            error: `Zu viele Fehlversuche. Zugang ist für noch ${minutesLeft} Minuten gesperrt.`,
        });
    }
    next();
}
