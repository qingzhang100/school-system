import supabase from "../config/supabaseClient.js";

export async function getAnnouncements() {
  const { data, error } = await supabase
    .from("Announcements")
    .select("*, Users(FirstName, LastName)")
    .order("CreatedAt", { ascending: false });

  console.log("API fetchAnnouncements", data);
  if (error) console.error("Error fetching announcements:", error);
  return data;
}

export async function addAnnouncement(newData) {
  const { Title, Content, CreatedAt, UserID } = newData;
  const { data, error } = await supabase.from("Announcements").insert([
    {
      Title,
      Content,
      CreatedAt,
      UserID,
    },
  ]);

  if (error) console.error("Error adding announcement:", error);
  return data;
}

export async function getAnnouncementById(id) {
  const { data, error } = await supabase
    .from("Announcements")
    .select(
      `
      *,
      Users (
        FirstName,
        LastName
      )
    `
    )
    .eq("Id", id)
    .single();

  if (error) {
    console.error("Error fetching announcement by ID:", error);
    return null;
  }

  return data;
}

// services/apiAnnouncements.js
export async function updateAnnouncement(updatedAnnouncement) {
  const { data, error } = await supabase
    .from("Announcements")
    .update(updatedAnnouncement)
    .eq("Id", updatedAnnouncement.Id)
    .select();

  if (error) {
    console.error("Error updating announcement:", error);
    return null;
  }
  return data[0];
}

export async function markUserAsRead(announcementId, userNo) {
  const { data, error } = await supabase
    .from("Announcements")
    .select("ReadBy")
    .eq("Id", announcementId)
    .single();

  if (error) {
    console.error("Error fetching announcement data:", error);
    return false;
  }

  let updatedReadBy = data.ReadBy || [];

  if (!updatedReadBy.includes(userNo)) {
    updatedReadBy.push(userNo);
  }

  const { updateError } = await supabase
    .from("Announcements")
    .update({ ReadBy: updatedReadBy })
    .eq("Id", announcementId);

  if (updateError) {
    console.error("Error updating ReadBy:", updateError);
    return false;
  }

  return true;
}

// services/apiAnnouncements.js
export async function getUnreadAnnouncementsCount(userNo) {
  console.log("USERNO", userNo);
  userNo = String(userNo);
  try {
    // Fetch all announcements
    const { data, error } = await supabase
      .from("Announcements")
      .select("Id, ReadBy");

    if (error) {
      console.error("Error fetching announcements:", error);
      return 0;
    }

    // Count unread announcements
    const unreadCount = data.filter((announcement) => {
      let readBy = announcement.ReadBy;

      if (!readBy) {
        readBy = [];
      }

      if (readBy === "") {
        readBy = [];
      }

      if (typeof readBy === "string") {
        readBy = [readBy];
      }

      const isUnread = !readBy.includes(userNo);

      console.log(
        `Announcement ID: ${announcement.Id}, User: ${userNo}, ReadBy: ${readBy}, Unread: ${isUnread}`
      );

      return isUnread;
    }).length;

    console.log("Unread announcements count:", unreadCount);

    console.log("Unread announcements count:", unreadCount);

    console.log("API getUnread ==>", unreadCount);
    return unreadCount;
  } catch (error) {
    console.error("Error in getUnreadAnnouncementsCount:", error);
    return 0;
  }
}
