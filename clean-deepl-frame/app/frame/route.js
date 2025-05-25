export const dynamic = 'force-dynamic';

export async function POST(request) {
  const body = await request.json();
  const { untrustedData } = body;
  const inputText = untrustedData?.inputText || '';

  const response = await fetch('https://api-free.deepl.com/v2/translate', {
    method: 'POST',
    headers: {
      'Authorization': `DeepL-Auth-Key ${process.env.DEEPL_API_KEY}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      text: inputText,
      target_lang: 'JA', // 初期値として日本語へ翻訳
    }),
  });

  const result = await response.json();
  const translated = result.translations?.[0]?.text || '翻訳失敗';

  return Response.json({
    frames: [
      {
        image: `https://dummyimage.com/600x400/000/fff&text=${encodeURIComponent(translated)}`,
        textInput: '翻訳したい英語を入力してください',
        buttons: [
          { label: 'もう一度翻訳', action: 'post' },
        ],
      },
    ],
  });
}
