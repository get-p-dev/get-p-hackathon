const Footer = () => {
  return (
    <footer className="mx-auto w-full overflow-hidden bg-gray-50 px-4 pt-8 text-sm font-light text-gray-600">
      <section className="mx-auto grid max-w-6xl grid-flow-col grid-cols-2 grid-rows-4 gap-2 border-b-2 border-gray-100 pb-6">
        <h4 className="font-normal text-gray-400">상담시간</h4>
        <p>평일 09:00 ~ 18:00</p>
        <p>점심 12:00 ~ 13:30</p>
        <p>(주말 공휴일은 제외)</p>

        <h4 className="font-normal text-gray-400">Contact</h4>
        <p>1599-0000</p>
        <p>support@getp.com</p>
      </section>
      <section className="mx-auto flex max-w-6xl flex-col gap-4 pt-6">
        <p>
          (주)갯피는 통신판매중개자로서 통신판매의 당사자가 아니며 개별 판매자가
          제공하는 서비스에 대한 이행, 계약사항 등과 관련한 의무와 책임은
          거래당사자에게 있습니다.
        </p>
        <p>
          (주)갯피 사이트의 상품/판매회원/중개 서비스/거래 정보, 콘텐츠, UI 등에
          대한 무단복제, 전송, 배포, 스크래핑 등의 행위는 저작권법, 콘텐츠산업
          진흥법 등 관련법령에 의하여 엄격히 금지합니다.
        </p>
        <p>
          상호명:(주)갯피 · 대표이사:KIM BLABLA · 개인정보책임관리자:김태우 ·
          주소:서울특별시 강남구 테헤란로 415, L7 강남타워 5층
        </p>
        <p>
          사업자등록번호:000-00-00000 · 통신판매업신고증:제 0000-서울강남-00000
          호 · 직업정보제공사업 신고번호:대구청 제 0000-00호
        </p>
      </section>
      <section className="flex justify-center py-8">
        <p className="text-gray-300">
          Copyright ©Getp Inc. All Rights Reserved.
        </p>
      </section>
    </footer>
  );
};

export default Footer;
