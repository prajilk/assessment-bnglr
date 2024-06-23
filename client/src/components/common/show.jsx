import { Children } from "react";

// Used to conditionally render Element in a Simple and easy understandable way
export const Show = (props) => {
  let when = null;
  let otherwise = null;

  Children.forEach(props.children, (children) => {
    if (children?.props.isTrue === undefined) {
      otherwise = children;
    } else if (!when && children?.props.isTrue === true) {
      when = children;
    }
  });

  return when || otherwise;
};

Show.When = ({ isTrue, children }) => isTrue && children;
Show.Else = ({ children }) => children;
