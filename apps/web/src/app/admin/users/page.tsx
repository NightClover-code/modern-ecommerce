import { Container } from '@/components/ui/container';
import { UsersList } from '@/modules/admin/components/users-list';
import { getUsers } from '@/modules/admin/actions/get-users';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from '@/components/ui/pagination';
import { getVisiblePages } from '@/lib/utils';

interface AdminUsersPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function AdminUsersPage({
  searchParams,
}: AdminUsersPageProps) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const { items: users, pages } = await getUsers(currentPage, 10);

  const visiblePages = getVisiblePages(currentPage, pages);

  return (
    <Container>
      <div className="py-10 space-y-6">
        <UsersList users={users} />
        <div className="flex justify-center">
          {pages > 1 && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href={`/admin/users?page=${currentPage - 1}`}
                    isActive={currentPage > 1}
                  />
                </PaginationItem>

                {visiblePages.map((pageNum, idx) =>
                  pageNum === null ? (
                    <PaginationItem key={`ellipsis-${idx}`}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  ) : (
                    <PaginationItem key={pageNum}>
                      <PaginationLink
                        href={`/admin/users?page=${pageNum}`}
                        isActive={currentPage === pageNum}
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  ),
                )}

                <PaginationItem>
                  <PaginationNext
                    href={`/admin/users?page=${currentPage + 1}`}
                    isActive={currentPage < pages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </div>
    </Container>
  );
}
