import Theme from "./theme/index.jsx";
import Query from "./query/index.jsx";

const Index = ({children}: { children: any }) => {
  return (
      <Theme>
        <Query>
          {children}
        </Query>
      </Theme>
  );
};

export default Index;
