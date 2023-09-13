import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Head from 'next/head';
import Article from './Article';
import TopArticle from './TopArticle';
import styles from '../styles/Home.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'


function Home() {
  const bookmarks = useSelector((state) => state.bookmarks.value);
  const hiddenArticle = useSelector((state)=> state.hiddenArticles.value )
  const [articlesData, setArticlesData] = useState([]);
  const [topArticle, setTopArticle] = useState({});
  const dispatch = useDispatch()

  useEffect(() => {
    fetch('https://morning-news-backend-ivory.vercel.app/articles')
      .then(response => response.json())
      .then(data => {
        setTopArticle(data.articles[0]);
        setArticlesData(data.articles.filter((data, i) => i > 0));
      });
  }, []);


console.log(hiddenArticle)


  const articles = articlesData.map((data, i) => {
    if(!hiddenArticle.find(e => e.title === data.title)) {
      const isBookmarked = bookmarks.some(bookmark => bookmark.title === data.title);
      const isHide = hiddenArticle.some(article => article.title === data.title)
      return <Article key={i} {...data} isBookmarked={isBookmarked} />;
    } 
   
  });


  let topArticles;
  if (bookmarks.some(bookmark => bookmark.title === topArticle.title)) {
    topArticles = <TopArticle {...topArticle} isBookmarked={true} />
  } else {
    topArticles = <TopArticle {...topArticle} isBookmarked={false} />
  }

  return (
    <div>
      <Head>
        <title>Morning News - Home</title>
      </Head>
      {topArticles}
      <div className={styles.articlesContainer}>
        {articles}
      </div>
    </div>
  );
}

export default Home;
