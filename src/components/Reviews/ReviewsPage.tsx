import "./ReviewsPage.scss";

const ReviewsPage = () => {
  return (
    <div className="ReviewsPage">
      <div className="ReviewsPageHeader">
        <div className="ReviewsPageHeader__left">
          <span>Доходы</span>
          <span>Сумма</span>
        </div>
        <div className="ReviewsPageHeader__right">
          <span>Расходы</span>
          <span>Сумма</span>
        </div>
      </div>

      <div className="progressWeek">
        <div className="progressWeek__day">
          <div className="col" />
          <span>Пн</span>
        </div>
      </div>
    </div>
  );
};

export default ReviewsPage;
