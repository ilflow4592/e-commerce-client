export const encodeToBase64Query = (data: Record<string, any>): string => {
  try {
    // 1. 객체를 JSON 문자열로 변환
    const jsonString = JSON.stringify(data);

    // 2. Base64로 인코딩 (Buffer 사용)
    const base64Encoded = Buffer.from(jsonString).toString("base64");

    // 3. URL Query Parameter로 반환 (URI Encoding 추가)
    return `?data=${encodeURIComponent(base64Encoded)}`;
  } catch (error) {
    console.error("Error encoding to Base64:", error);
    return "";
  }
};

export const decodeFromBase64Query = (
  query: string
): Record<string, any> | null => {
  try {
    // 1. `?data=...`에서 Base64 문자열만 추출
    const base64String = decodeURIComponent(query.split("=")[1]);

    // 2. Base64 디코딩 후 JSON 파싱
    return JSON.parse(Buffer.from(base64String, "base64").toString("utf-8"));
  } catch (error) {
    console.error("Failed to decode Base64 query:", error);
    return null;
  }
};
