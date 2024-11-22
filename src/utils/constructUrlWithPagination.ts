const constructUrlWithPagination = ({
  url,
  page,
  amount,
}: {
  url: string;
  page?: number;
  amount?: number;
}): string | Error => {
  if (page && amount) {
    return `${url}/amount=${amount}&page=${page}`;
  }

  if (page && amount === undefined) {
    return new Error('page is presented but amount is undefined.');
  }
  if (page === undefined && amount) {
    return new Error('amount is presented but page is undefined.');
  }

  return url;
};

export default constructUrlWithPagination;
