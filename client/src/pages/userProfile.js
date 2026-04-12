import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Avatar, Box, Button, Dialog, DialogTitle, DialogContent, IconButton,
  Divider, List, ListItem, ListItemAvatar, ListItemText, Paper,
  Typography, Tooltip, Skeleton
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import GridOnIcon from "@mui/icons-material/GridOn";
import PostCard from "../components/card";
import "../css/Account.css";

function UserProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [counts, setCounts] = useState({ followers: 0, following: 0 });
  const [isFollowing, setIsFollowing] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);
  const [followList, setFollowList] = useState([]);
  const [followListTitle, setFollowListTitle] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isOwnProfile, setIsOwnProfile] = useState(false);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      axios.get(`/user/profile/${id}`),
      axios.get(`/post/user/${id}`),
      axios.get(`/follow/counts/${id}`),
      axios.get(`/follow/status/${id}`),
      axios.get(`/user/information`),
    ])
      .then(([profileRes, postsRes, countsRes, statusRes, meRes]) => {
        setProfile(profileRes.data.user);
        setPosts(postsRes.data.result);
        setCounts(countsRes.data);
        setIsFollowing(statusRes.data.following);
        const myId = meRes.data.information[0]?._id?.toString();
        setIsOwnProfile(myId === id.toString());
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  const handleFollow = () => {
    setFollowLoading(true);
    axios.post(`/follow/${id}`).then(() => {
      setIsFollowing(true);
      setCounts((c) => ({ ...c, followers: c.followers + 1 }));
    }).finally(() => setFollowLoading(false));
  };

  const handleUnfollow = () => {
    setFollowLoading(true);
    axios.delete(`/follow/${id}`).then(() => {
      setIsFollowing(false);
      setCounts((c) => ({ ...c, followers: Math.max(0, c.followers - 1) }));
    }).finally(() => setFollowLoading(false));
  };

  const openFollowers = () => {
    axios.get(`/follow/followers/${id}`).then((res) => {
      setFollowList(res.data.result.map((r) => r.followerId));
      setFollowListTitle("Followers");
      setDialogOpen(true);
    });
  };

  const openFollowing = () => {
    axios.get(`/follow/following/${id}`).then((res) => {
      setFollowList(res.data.result.map((r) => r.followingId));
      setFollowListTitle("Following");
      setDialogOpen(true);
    });
  };

  if (loading) {
    return (
      <Box sx={{ maxWidth: 640, mx: "auto", px: 2, pt: 10, pb: 6 }}>
        <Paper elevation={4} sx={{ borderRadius: 4, overflow: "hidden", mb: 4 }}>
          <Skeleton variant="rectangular" height={140} />
          <Box sx={{ display: "flex", justifyContent: "center", mt: -6, mb: 1 }}>
            <Skeleton variant="circular" width={110} height={110} />
          </Box>
          <Box sx={{ px: 4, pb: 3, textAlign: "center" }}>
            <Skeleton width="40%" sx={{ mx: "auto", mb: 1 }} />
            <Skeleton width="70%" sx={{ mx: "auto" }} />
            <Skeleton width="70%" sx={{ mx: "auto", mb: 2 }} />
            <Skeleton variant="rectangular" height={38} width={120} sx={{ mx: "auto", borderRadius: 2 }} />
          </Box>
        </Paper>
      </Box>
    );
  }

  if (!profile) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="80vh" gap={2}>
        <Typography variant="h6" color="text.secondary">User not found</Typography>
        <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}>Go back</Button>
      </Box>
    );
  }

  return (
    <Box className="backgound-account" sx={{ minHeight: "100vh" }}>
      <Box sx={{ maxWidth: 800, mx: "auto", px: 2, pt: 10, pb: 6 }}>

        {/* Back button */}
        <Box mb={2}>
          <Tooltip title="Go back">
            <IconButton onClick={() => navigate(-1)} sx={{ bgcolor: "white", boxShadow: 1, "&:hover": { bgcolor: "grey.100" } }}>
              <ArrowBackIcon />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Profile Card */}
        <Paper elevation={4} sx={{ borderRadius: 4, overflow: "hidden", mb: 4 }}>
          {/* Banner */}
          <Box sx={{ height: 140, background: "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)" }} />

          {/* Avatar */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: -7, mb: 1 }}>
            <Avatar
              src={profile.img || "https://www.pngkey.com/png/detail/282-2820067_taste-testing-at-baskin-robbins-empty-profile-picture.png"}
              alt={profile.name}
              sx={{ width: 110, height: 110, border: "4px solid white", boxShadow: 4 }}
            />
          </Box>

          <Box sx={{ textAlign: "center", px: 4, pb: 3 }}>
            <Typography variant="h5" fontWeight={700}>{profile.name}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, mb: 2, maxWidth: 360, mx: "auto" }}>
              {profile.bio || "This user hasn't written a bio yet."}
            </Typography>

            {/* Stats row */}
            <Box
              display="flex"
              justifyContent="center"
              gap={0}
              mt={1}
              mb={3}
              sx={{ borderTop: "1px solid", borderBottom: "1px solid", borderColor: "divider", py: 2 }}
            >
              <Tooltip title="Click to see followers">
                <Box
                  sx={{ flex: 1, cursor: "pointer", textAlign: "center", "&:hover": { bgcolor: "grey.50" }, borderRadius: 2, py: 1 }}
                  onClick={openFollowers}
                >
                  <Typography variant="h6" fontWeight={700}>{counts.followers}</Typography>
                  <Typography variant="caption" color="text.secondary">Followers</Typography>
                </Box>
              </Tooltip>
              <Divider orientation="vertical" flexItem />
              <Tooltip title="Click to see following">
                <Box
                  sx={{ flex: 1, cursor: "pointer", textAlign: "center", "&:hover": { bgcolor: "grey.50" }, borderRadius: 2, py: 1 }}
                  onClick={openFollowing}
                >
                  <Typography variant="h6" fontWeight={700}>{counts.following}</Typography>
                  <Typography variant="caption" color="text.secondary">Following</Typography>
                </Box>
              </Tooltip>
              <Divider orientation="vertical" flexItem />
              <Box sx={{ flex: 1, textAlign: "center", py: 1 }}>
                <Typography variant="h6" fontWeight={700}>{posts.length}</Typography>
                <Typography variant="caption" color="text.secondary">Posts</Typography>
              </Box>
            </Box>

            {/* Action button */}
            {!isOwnProfile && (
              isFollowing ? (
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<PersonRemoveIcon />}
                  onClick={handleUnfollow}
                  disabled={followLoading}
                  sx={{ borderRadius: 3, px: 4, textTransform: "none", fontWeight: 600 }}
                >
                  Unfollow
                </Button>
              ) : (
                <Button
                  variant="contained"
                  startIcon={<PersonAddIcon />}
                  onClick={handleFollow}
                  disabled={followLoading}
                  sx={{ borderRadius: 3, px: 4, textTransform: "none", fontWeight: 600 }}
                >
                  Follow
                </Button>
              )
            )}

            {isOwnProfile && (
              <Button
                variant="outlined"
                sx={{ borderRadius: 3, px: 4, textTransform: "none", fontWeight: 600 }}
                onClick={() => navigate("/account")}
              >
                Edit Profile
              </Button>
            )}
          </Box>
        </Paper>

        {/* Posts section */}
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <GridOnIcon fontSize="small" color="action" />
          <Typography variant="h6" fontWeight={700}>Posts</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ ml: "auto" }}>{posts.length} {posts.length === 1 ? "post" : "posts"}</Typography>
        </Box>

        {posts.length === 0 ? (
          <Paper elevation={0} sx={{ textAlign: "center", py: 6, borderRadius: 4, bgcolor: "white", border: "1px dashed #ccc" }}>
            <Typography color="text.secondary" variant="body1">No posts yet</Typography>
          </Paper>
        ) : (
          posts.map((post, i) => <PostCard obj={post} key={i} />)
        )}

        {/* Followers / Following Dialog */}
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="xs" PaperProps={{ sx: { borderRadius: 3 } }}>
          <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1, fontWeight: 700 }}>
            <PeopleIcon color="primary" /> {followListTitle}
          </DialogTitle>
          <DialogContent dividers sx={{ p: 0 }}>
            {followList.length === 0 ? (
              <Typography color="text.secondary" py={4} textAlign="center">Nobody here yet</Typography>
            ) : (
              <List disablePadding>
                {followList.map((user) => (
                  <ListItem
                    key={user._id}
                    sx={{ cursor: "pointer", "&:hover": { bgcolor: "grey.50" } }}
                    onClick={() => { setDialogOpen(false); navigate(`/profile/${user._id}`); }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        src={user.img || "https://www.pngkey.com/png/detail/282-2820067_taste-testing-at-baskin-robbins-empty-profile-picture.png"}
                        alt={user.name}
                      />
                    </ListItemAvatar>
                    <ListItemText primary={<Typography fontWeight={600}>{user.name}</Typography>} />
                  </ListItem>
                ))}
              </List>
            )}
          </DialogContent>
        </Dialog>
      </Box>
    </Box>
  );
}

export default UserProfile;
