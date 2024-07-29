import { useDocumentTitle } from '@refinedev/react-router-v6';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PageTitle = ({ title }: {
    title: string;
}) => {
    useDocumentTitle(title);

    return (
        <></>
    )
};

export default PageTitle;
