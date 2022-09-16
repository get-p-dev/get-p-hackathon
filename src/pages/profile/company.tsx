import axios from "axios";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Logo from "../../components/common/logo";

const CompanyProfileSchema = z.object({
  name: z.string(),
  industry: z.string(),
  ceo: z.string(),
  introduction: z.string(),
  phoneNumber: z.string(),
  url: z.string(),
  address: z.string(),
  userObjectId: z.string(),
});

type CompanyProfileProps = z.infer<typeof CompanyProfileSchema>;

async function onValid(
  data: CompanyProfileProps,
  cookie: string
): Promise<any> {
  console.log(data);
  // 1. 쿠키에 있는 토큰을 가져온다.
  // 2. 토큰을 헤더에 넣어서 요청을 보낸다.
  // 3. 요청이 성공하면 프로필 사진 등록 페이지로 이동한다.
  try {
    const res = await axios.post("http://localhost:8080/company", data, {
      headers: { Authorization: `Bearer ${cookie}` },
    });
    return res;
  } catch (err) {
    return err;
  }
}

export default function Company() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CompanyProfileProps>();
  const router = useRouter();
  const [cookie] = useCookies(["token"]);

  return (
    <main className="grid h-screen place-items-center px-4 lg:px-0">
      <div className="p- card w-full max-w-lg border-2 bg-base-100 shadow-xl">
        <div className="card-body">
          <figure>
            <Logo />
          </figure>
          <h2 className="card-title pt-8">의뢰자 프로필 등록</h2>
          <form
            onSubmit={handleSubmit(async (data) => {
              const res = await onValid(data, cookie.token);
              const successful = res.status >= 200 && res.status < 300;
              if (successful) {
                http: router.push("/profile/picture");
              }
            })}
            className="flex flex-col gap-4"
          >
            <div className="form-control w-full max-w-lg">
              <label className="label">
                <span className="label-text">회사명</span>
              </label>
              <input
                type="text"
                placeholder="회사명을 입력하세요"
                className="input input-bordered w-full max-w-lg"
                {...register("name", { required: true })}
              />
              <label className="label">
                <span className="label-text">업종</span>
              </label>
              <input
                type="text"
                placeholder="업종을 입력하세요"
                className="input input-bordered w-full max-w-lg"
                {...register("industry", { required: true })}
              />
              <label className="label">
                <span className="label-text">대표자</span>
              </label>
              <input
                type="text"
                placeholder="대표자를 입력하세요"
                className="input input-bordered w-full max-w-lg"
                {...register("ceo", { required: true })}
              />
              <label className="label">
                <span className="label-text">소개 및 설명</span>
              </label>
              <textarea
                placeholder="회사에 대한 간단한 소개 및 설명을 입력하세요"
                className="textarea textarea-bordered w-full max-w-lg"
                {...register("introduction", { required: true })}
              />
              <label className="label">
                <span className="label-text">대표자 전화번호</span>
              </label>
              <input
                type="text"
                placeholder="대표자 전화번호를 입력하세요"
                className="input input-bordered w-full max-w-lg"
                {...register("phoneNumber", { required: true })}
              />
              <label className="label">
                <span className="label-text">웹사이트 주소</span>
              </label>
              <input
                type="text"
                placeholder="회사의 웹사이트 주소를 입력하세요"
                className="input input-bordered w-full max-w-lg"
                {...register("url", { required: true })}
              />
              <label className="label">
                <span className="label-text">회사 주소</span>
              </label>
              <input
                type="text"
                placeholder="회사 주소를 입력하세요"
                className="input input-bordered w-full max-w-lg"
                {...register("address", { required: true })}
              />
            </div>
            <div className="card-actions">
              <button className="btn btn-primary w-full text-base">
                회원가입
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
