// 지금 많이 읽고 있는 작품
    async function bookData() {
    const REST_API_KEY = '961d707951016f7571fca49eb70206f3';
    const params = new URLSearchParams({
        target: 'person',
        query: "김유신"
    });

    const url = `https://dapi.kakao.com/v3/search/book?${params}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `KakaoAK ${REST_API_KEY}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP 오류! 상태 코드: ${response.status}`);
        }

        const data = await response.json();
        
        // .box 요소 전체 선택
        const boxElements = document.querySelectorAll(".book List");
        console.log(boxElements)

        // documents 데이터를 각 box에 대응하여 렌더링
        boxElements.forEach((box, i) => {
            const doc = data.documents[i];

            if (!doc) return; // 데이터가 부족할 경우 생략

            // <img>
            const img = document.createElement("img");
            img.src = doc.thumbnail;
            box.appendChild(img);

            // <h3> 제목
            const h3 = document.createElement("h3");
            h3.textContent = doc.title;
            box.appendChild(h3);

            // <h6> 저자
            const h6 = document.createElement("h6");
            h6.textContent = doc.authors;
            box.appendChild(h6);

            // <p> 내용 일부
            const p = document.createElement("p");
            p.textContent = doc.contents.substring(0, 60);
            box.appendChild(p);

            // <button>
            const btn = document.createElement("button");
            btn.textContent = "click";
            box.appendChild(btn);
        });



    } catch (error) {
        console.log('에러발생', error);
    }
}
bookData();

