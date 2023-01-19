import PlanItem from "@/components/author/detail/PlanItem";
import { useSelector } from "react-redux";

export default function Plan ({ item }){
  const currentAuthor = useSelector(({ author }) => author.currentAuthor);

  const renderSubscribTiers = () => {
    return currentAuthor?.subscribeTiers?.map((item, index) => {
      return (
        <PlanItem key={`plan_${index}`} item={item} />
      );
    });
  };

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
        {
          renderSubscribTiers()
        }
      </div>
    </>
  );
};

