import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import Logo from "../../components/common/logo";

type ProfilePictureProps = {
  profilePicture: FileList;
};

async function onValid(data: ProfilePictureProps, cookie: string) {
  const image = data.profilePicture[0];
  if (image) {
    const formData = new FormData();
    formData.append("image", image);
    try {
      const res = await axios.post(
        "http://localhost:8080/users/image",
        formData,
        {
          headers: { Authorization: `Bearer ${cookie}` },
        }
      );
      return res;
    } catch (err) {}
  }
  // 1. 쿠키에 있는 토큰을 가져온다.
  // 2. 토큰을 헤더에 넣어서 요청을 보낸다.
  // 3. 요청이 성공하면 프로필 사진 등록 페이지로 이동한다.
}

export default function Picture() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ProfilePictureProps>();
  const router = useRouter();
  const [cookie] = useCookies(["token"]);
  const [preview, setPreview] = useState("");

  console.log(watch("profilePicture"));

  return (
    <main className="my-4 grid place-items-center px-4 py-8 lg:px-0">
      <div className="card w-full max-w-lg border-2 bg-base-100 shadow-xl">
        <div className="card-body">
          <figure className="flex w-full justify-center">
            <Logo />
          </figure>
          <h2 className="card-title pt-8">프로필 사진 등록</h2>
          <form
            onSubmit={handleSubmit(async (data) => {
              if (!data.profilePicture[0]) return;

              const res: any = await onValid(data, cookie.token);
              const successful = res.status >= 200 && res.status < 300;
              if (successful) {
                http: router.push("/");
              }
            })}
            className="flex flex-col gap-4"
          >
            <div className="form-control w-full max-w-lg py-4">
              <input
                type="file"
                className="hidden w-full max-w-lg"
                accept="image/*"
                id="profilePicture"
                {...register("profilePicture", {
                  required: true,
                  onChange: (e) => {
                    if (!e?.target?.files) return;
                    if (!e.target.files[0]) return;
                    setPreview(URL.createObjectURL(e.target.files[0]));
                  },
                })}
              />

              <label
                htmlFor="profilePicture"
                className="avatar mx-auto cursor-pointer"
              >
                <div className="w-48 rounded-full border-2 transition-all duration-300 ease-out hover:scale-110 hover:shadow-lg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={preview || "/profile.svg"} alt="profile-picture" />
                </div>
              </label>
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
