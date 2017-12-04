import * as React from 'react';
import Card from '../ui/Card';
interface PropTypes {
  snippet: any,
  id: any,
  setCurrentVideo: any,
  myKey: number,
  currentKey: number,

}

class VideoItem extends React.Component<any, any> {
  setToPlay = () => {
    this.props.setCurrentVideo(this.props.id.videoId, this.props.myKey);
  }

  render() {
    const { snippet, id, setCurrentVideo, myKey, currentKey } = this.props;
    return (
      <div>
      <Card
        title={snippet.title}
        subtitle={snippet.channelTitle}
        img={snippet.thumbnails.medium.url}
        description={snippet.description}
        setToPlay={this.setToPlay}
        action1={'Play'}
      />
        { myKey === currentKey && <div>Now Playing</div>}
      </div>
    )
  }
}

export default VideoItem;
