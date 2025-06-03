import { useEffect, useState } from 'react';
import './App.css';
import { Posts } from './components/Posts';
import Pagination from './components/Pagination';

function App() {
  const [posts, setPosts]= useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(10);
  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await res.json(); // Parse JSON manually
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, []);


  // console.log(post);

  //Get current posts
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPost = posts?.slice(indexOfFirstPost, indexOfLastPost);
  

  //change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)
  return (
    <div className="container mt-5">
    <h1 className="text-primary mb-3">My Blog</h1>
    <Posts posts={currentPost} loading={loading}/>
    <Pagination postPerPage={postPerPage} totalPost={posts.length} paginate={paginate}/>
    </div>
  );
}

export default App;
