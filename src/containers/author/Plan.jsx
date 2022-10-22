import React, { useEffect, useState } from "react";
import { getFileUrlFromServer } from "@API/fileService";
import { getAuthorPlans as getAuthorPlansAPI } from "@API/authorService";
import { useCallback } from "react";

async function getFileURLData(hash, state) {
  const response = await getFileUrlFromServer(hash);
  if (response.status === 200) {
    state(response?.data?.url);
  }
}

const PlanItem = ({ plan }) => {
  const [thumbnailImgURL, setThumbnailImgURL] = useState(null);
  useEffect(() => {
    if (plan?.thumbnailImage) {
      getFileURLData(plan.thumbnailImage, setThumbnailImgURL);
    }
  }, [plan]);
  return (
    <div className="col" style={{ marginBottom: "2.33%" }}>
      <div className="icon">
        <img src={thumbnailImgURL} alt="plan" />
      </div>
      <div className="cont">
        <h3 className="h1">{plan.name}</h3>
        <p className="t1">
          <span className="c-blue">{plan.price}PC</span> /月
        </p>
        <p className="t2">{plan.description}</p>
        <div className="t_dot1">
          <p>・差分が見れます</p>
          <p>・ダイヤモンドプランの内容＋psdファイルを公開しています。</p>
        </div>
        <a href="#" className="btn-pk b blue w100p">
          <span>編集する</span>
        </a>
      </div>
    </div>
  );
};

const Plan = ({ item }) => {
  const [planData, setPlanData] = useState();

  const getAuthorPlans = useCallback(async () => {
    const response = await getAuthorPlansAPI({ authorId: item?.id });
    if (response?.status === 200) {
      setPlanData(response.data.subscribeTiers);
    }
  }, [item]);

  useEffect(() => {
    getAuthorPlans();
  }, [item]);

  return (
    <>
      <header className="hd_titbox3">
        <h2 className="h_tit0">
          <span>無限のお菓子バッグについて</span>
        </h2>
        <p className="t1">
          氷室くんの感情の機微を、冬月さんはどのくらい把握出来てるのかなぁ…嬉しい時の雪だるまは
          <br className="hide-m" />
          嬉しそうな雰囲気に見えてるんだろうか…第三者的に見てると、観察して行動パターン把握したくなります(笑)
        </p>
      </header>

      <div className="lst_mainplan">
        {planData &&
          planData.map((plan, index) => (
            <PlanItem key={`plan_${index}`} plan={plan} />
          ))}
      </div>
    </>
  );
};

export default Plan;
