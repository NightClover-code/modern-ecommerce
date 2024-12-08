import { Pagination } from 'react-bootstrap';
import Link from 'next/link';
import { v4 } from 'uuid';

interface PaginateProps {
  pages: number;
  page: number;
  isAdmin?: boolean;
  keyword?: query;
}

const Paginate: React.FC<PaginateProps> = ({
  pages,
  page,
  isAdmin = false,
  keyword = '',
}) => {
  return pages > 1 ? (
    <Pagination>
      {[...Array(pages).keys()].map(x => (
        <Link
          key={v4()}
          href={
            !isAdmin
              ? keyword
                ? `/search/${keyword}/page/${x + 1}`
                : `/page/${x + 1}`
              : `/admin/products/page/${x + 1}`
          }
          passHref
        >
          <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
        </Link>
      ))}
    </Pagination>
  ) : (
    <></>
  );
};

export default Paginate;
