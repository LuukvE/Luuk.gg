import './Meeting.scss';
import React, { FC, useEffect, useCallback, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import Video from 'twilio-video';
import { nanoid } from 'nanoid';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import useTwilio from '../hooks/useTwilio';
import useQuery from '../hooks/useQuery';
import { useDispatch, useSelector, actions } from '../store';

const Meeting: FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { query, setQuery } = useQuery();
  const { getTwilioToken } = useTwilio();
  const { token } = useSelector((state) => state.twilio);

  // Audio and Video of the local user of the browser
  const localVideo = useRef<HTMLVideoElement | null>(null);
  const localAudio = useRef<HTMLAudioElement | null>(null);

  // Audio and Video of the remote user connecting over WebRTC
  const remoteVideo = useRef<HTMLVideoElement | null>(null);
  const remoteAudio = useRef<HTMLAudioElement | null>(null);

  // When the remote user connects over WebRTC
  const onConnect = useCallback((participant: Video.RemoteParticipant) => {
    // And the users video or audio track is connecting
    participant.on('trackSubscribed', (track) => {
      if (track.kind === 'video') {
        const t: Video.RemoteVideoTrack = track;

        if (remoteVideo.current) {
          // Connect the video track and show the Video element
          t.attach(remoteVideo.current);

          remoteVideo.current.classList.remove('hide');
        }
      } else if (track.kind === 'audio') {
        // Connect the audio track to the Audio element
        const t: Video.RemoteAudioTrack = track;

        if (remoteAudio.current) t.attach(remoteAudio.current);
      }
    });

    // When the remote user disconnects
    participant.on('trackUnsubscribed', (track) => {
      if (track.kind === 'video') {
        const t: Video.RemoteVideoTrack = track;

        // Disconnect the video track and hide the Video element
        t.detach();

        if (remoteVideo.current) remoteVideo.current.classList.add('hide');
      } else if (track.kind === 'audio') {
        const t: Video.RemoteAudioTrack = track;

        // Disconnect the audio track
        t.detach();
      }
    });
  }, []);

  // When the page is loaded
  useEffect(() => {
    // Don't do anything if a token already exists
    if (token) return;

    // Get the room ID from local storage or generate a new one and show it in the URL
    if (!query.room) {
      try {
        query.room = localStorage.getItem('room') || '';
      } catch (e) {}

      setQuery({ room: query.room || nanoid() }, { replace: true });

      return;
    }

    // Save the current room ID to local storage
    try {
      localStorage.setItem('room', query.room);
    } catch (e) {}

    // Request a new token from the API and save it in the store
    getTwilioToken(query.room);
  }, [getTwilioToken, setQuery, query, token]);

  // If token or query changes
  useEffect(() => {
    // Stop if token is not set
    if (!token) return;

    // Function-wide scope to allow disconnecting from the room
    let room: Video.Room | null = null;

    // Request audio and video tracks for both local and remote users from Twilio
    Video.connect(token, {
      name: query.room
    }).then((r) => {
      // Stop if meanwhile the token was cleared
      if (!token) return;

      // Put the room into the function-wide scope
      room = r;

      // Connect the audio and video of the local user
      const localAudioTrack = Array.from(room.localParticipant.audioTracks.values())[0];

      const localVideoTrack = Array.from(room.localParticipant.videoTracks.values())[0];

      if (localAudio.current) localAudioTrack.track?.attach(localAudio.current);

      if (localVideo.current) {
        localVideoTrack.track?.attach(localVideo.current);

        localVideo.current.classList.remove('hide');
      }

      // Loop over already connected remote users and listen for newly connecting remote users
      const participants = Array.from(room.participants.values());

      if (participants.length) onConnect(participants[0]);

      room.on('participantConnected', onConnect);
    });

    return () => {
      // If the local user leaves the page, disconnect from the room
      if (room) {
        room.disconnect();

        room.removeAllListeners();
      }

      // And clear the token
      dispatch(actions.set({ twilio: { token: '' } }));
    };
  }, [query.room, token, onConnect, dispatch]);

  return (
    <div className="Meeting">
      <div className="video-wrapper">
        <div className="local">
          <video className="hide" ref={localVideo} autoPlay={true} />
          <audio ref={localAudio} autoPlay={true} />
          <Spinner animation="border" />
        </div>
        <div className="remote">
          <video className="hide" ref={remoteVideo} autoPlay={true} />
          <audio ref={remoteAudio} autoPlay={true} />
          <Spinner animation="border" />
        </div>
      </div>
      <Button
        variant="secondary"
        onClick={() => {
          history.push('/');

          try {
            localStorage.setItem('room', '');
          } catch (e) {}
        }}
      >
        Leave Room <i className="fas fa-sign-out-alt" />
      </Button>
    </div>
  );
};

export default Meeting;
