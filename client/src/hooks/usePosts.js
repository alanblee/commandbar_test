import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { httpGetPosts, httpCreatePost } from "./requests";

const usePosts = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);

  const getPosts = useCallback(async () => {
    setLoading(true);
    try {
      const fetchedPosts = await httpGetPosts();
      const success = fetchedPosts.success;
      if (success) {
        setAllPosts(fetchedPosts.data.reverse());
      }
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const submitPost = useCallback(
    async (formData) => {
      setLoading(true);
      try {
        const postedForm = await httpCreatePost(formData);

        const success = postedForm.success;
        if (success) {
          getPosts();
          navigate("/");
        }
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    },
    [getPosts, navigate]
  );
  return {
    allPosts,
    loading,
    submitPost,
  };
};

export default usePosts;
