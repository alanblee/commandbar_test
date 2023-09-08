import React, { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { init } from "commandbar";

import usePosts from "./hooks/usePosts";

init("66c97e82");

// 2. trackEvent to trigger nudge
export const handleClick = () => {
  window.CommandBar.trackEvent("buttonClick", {});
};
const useCommandBar = () => {
  const navigate = useNavigate();
  const { allPosts } = usePosts();

  useEffect(() => {
    const loggedInUserId = "12345";
    window.CommandBar.boot(loggedInUserId);

    return window.CommandBar.shutdown;
  }, []);

  useEffect(() => {
    const router = (url) => {
      navigate(url);
    };
    window.CommandBar.addRouter(router);
  }, [navigate]);

  // 1. Add navigate commands
  useEffect(() => {
    window.CommandBar.addCommand({
      text: "Go to Home",
      name: "go_to_page_home",
      template: {
        type: "link",
        value: "/",
        operation: "router",
      },
      category: "Navigation",
    });

    window.CommandBar.addCommand({
      text: "Go to Create Post",
      name: "go_to_create_post_page",
      template: {
        type: "link",
        value: "/create-post",
        operation: "router",
      },
      category: "Navigation",
    });
  }, []);

  // 3. Command to call cat fact api
  const catFactSearch = (url) => {
    return fetch(`${url}`).then((response) => response.json());
  };
  useEffect(() => {
    window.CommandBar.addCallback("SuccessFact", async (args) => {
      try {
        const response = await catFactSearch(args.url);
        const facts = response.data.map(({ fact }) => {
          return { fact };
        });

        navigate("/facts", { state: facts });
      } catch (err) {
        alert(err);
      }
    });
    const onInputQuery = (query) => {
      return [query];
    };
    window.CommandBar.addArgumentChoices("factLimitArg", [], {
      onInputChange: onInputQuery,
    });
  }, [navigate]);

  // 4. Adds records from backend with preview
  useEffect(() => {
    window.CommandBar.addComponent(
      "record-preview-with-image",
      "Basic Record Preview with an image",
      {
        mount: (elem) => ({
          render: (data, metadata) => {
            elem.innerHTML =
              "<div>" +
              "<h3>" +
              data.label +
              "</h3>" +
              "<p>" +
              data.prompt +
              "</p>" +
              '<div><img src="' +
              data.photo +
              '" /></div>' +
              "</div>";
          },
          unmount: (elem) => {},
        }),
      }
    );
    window.CommandBar.addRecords(
      "pictures",
      () => {
        return allPosts.map(({ photo, name, prompt, _id }) => {
          return {
            photo,
            label: name,
            prompt,
            _id,
          };
        });
      },
      {
        detail: { type: "component", value: "record-preview-with-image" },
      }
    );
  }, [allPosts]);
};

export default useCommandBar;
