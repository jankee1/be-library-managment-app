export type BorrowedBookUserType = {
    borrowId?: string;
    bookId: string;
    title: string;
    author: string;
    borrowDate: string;
    additionalFees: number
    handleReturnBook?: ()=> {}
}