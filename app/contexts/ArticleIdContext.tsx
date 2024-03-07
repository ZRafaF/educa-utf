import { ArticlesResponse } from '@/types/pocketbase-types';
import { createContext } from 'react';

const ArticleIdContext = createContext<ArticlesResponse | undefined>(undefined);

export default ArticleIdContext;
