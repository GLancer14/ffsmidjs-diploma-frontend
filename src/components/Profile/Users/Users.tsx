import { useEffect, useRef, useState } from "react";
import styles from "./Users.module.scss";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHook";
import { getLibrariesCount } from "../../../api/libraries";
import { Paperclip, X } from "lucide-react";
import { fileToDataUrl } from "../../../utils/fileToDataUrl";
import { updateSelf } from "../../../api/users";
import { updateCurrentUser } from "../../../store/reducers/userSlice";

export function Users() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.usersReducer);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);
  const avatarFileInput = useRef<HTMLInputElement>(null);

  async function handleAvatarSelect (e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files !== null) {
      const files = [...e.target.files];
      const urls = await Promise.all(files.map(o => fileToDataUrl(o)));
      setAvatar(urls[0]);
    }
  }

  function handleAvatarDelete() {
    if (avatarFileInput.current) {
      avatarFileInput.current.value = "";
    }

    setAvatar(null);
  }

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const updatedUser = await updateSelf({
      name,
      email,
      contactPhone,
      password,
    });

    dispatch(updateCurrentUser(updatedUser));
  }

  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
    setContactPhone(user.contactPhone);
  }, []);

  return (
    <div className={styles.users}>
      
    </div>
  );
}