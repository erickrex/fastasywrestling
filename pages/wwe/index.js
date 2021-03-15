import Link from 'next/Link'
import * as _ from 'lodash';
import { layout } from '../../components/layout';
import { Error } from '../../components/notify/Error';

//This is the predictions final screen for WWE PPVs and should be updated after the results are in. Anyone with the link can access it regardless if they have an account or not or if they are logged in or not

const Recipe = ({ id }) => {
  const { loading, data, error } = useQuery(recipeGraphQL, {
    variables: { where: { id } },
  });
  const title = _.get(data, 'recipe.title');
  if (loading) {
    return (
      <MainLayout title="Recipe Loading">
        <Loading />
      </MainLayout>
    );
  }
  if (error) {
    return (
      <MainLayout title="Recipe Loading Error">
        <Error errorText={`${error}`} />
      </MainLayout>
    );
  }
  if (!title) {
    return (
      <MainLayout title="Not a valid recipe">
        <Error errorText={`Not a valid recipe`} />
      </MainLayout>
    );
  }
  return (
    <MainLayout title={title}>
      <p>{title}</p>
    </MainLayout>
  );
};
Recipe.getInitialProps = ({ query }) => {
  const { id } = query;
  return { id };
};
export default Recipe;