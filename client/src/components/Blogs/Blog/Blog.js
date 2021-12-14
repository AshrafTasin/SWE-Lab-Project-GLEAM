import React,{memo} from 'react';
import { Link } from "react-router-dom";
import cx from 'clsx';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useBlogTextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/blog';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
import useStyles from './styles';

export const Blog = memo(function BlogCard({blog}) {
  const styles = useStyles();
  const {
    button: buttonStyles,
    ...contentStyles
  } = useBlogTextInfoContentStyles();
  const shadowStyles = useOverShadowStyles();
  return (
    <Card className={cx(styles.root, shadowStyles.root)}>
      <CardMedia
        className={styles.media}
        image={blog.coverPhoto}
      />
      <CardContent>
        <TextInfoContent
          classes={contentStyles}
          overline={new Date(blog.createdAt).toDateString()}
          heading={blog.title}
          body={blog.summary}
        />
        <Link to={`/blog/${blog._id}`} className="link">
          <Button className={buttonStyles}>Read more</Button>
        </Link>
      </CardContent>
    </Card>
  );
});

export default Blog;