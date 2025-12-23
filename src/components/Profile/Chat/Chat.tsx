// import { useContext, useEffect, useState, type ChangeEvent } from "react";
import styles from "./Chat.module.scss";
// import classNames from "classnames";
// import { ActionModalContext } from "../../../../context/ActionModalContext";
// import { AlertContext } from "../../../../context/AlertContext";
// import { createLibrary, updateLibrary } from "../../../../api/libraries";
// import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHook";
// import { updateLibraryInfo, updateObservedLibraryProfile } from "../../../../store/reducers/observedLibraryProfileSlice";

export function Chat() {
  // const dispatch = useAppDispatch();
  // const { showAlert } = useContext(AlertContext);
  // const { closeActionModal } = useContext(ActionModalContext);

  // const observedLibraryProfile = useAppSelector(state => state.observedLibraryProfileReducer);
  // const [selectedRole, setSelectedRole] = useState("client");
  // const [name, setName] = useState("");
  // const [address, setAddress] = useState("");
  // const [description, setDescription] = useState("");

  // async function hanldeSubmit(e: React.FormEvent<HTMLFormElement>) {
  //   e.preventDefault();
  //   const updatedLibrary = await updateLibrary({
  //     id: observedLibraryProfile.id,
  //     name,
  //     address,
  //     description
  //   });
    // const createdUser = await createUser({
    //   name,
    //   description,
    //   address,
    //   password,
    //   role: selectedRole,
    // });

  //   if (!updatedLibrary.status) {
  //     showAlert!("Библиотека успешно обновлена!", "success");
  //     closeActionModal!();
  //     setName("");
  //     setAddress("");
  //     setDescription("");
  //     dispatch(updateLibraryInfo({
  //       name,
  //       address,
  //       description,
  //     }));
  //   }
  // }

  // useEffect(() => {
  //   setName(observedLibraryProfile.name || "");
  //   setAddress(observedLibraryProfile.address || "");
  //   setDescription(observedLibraryProfile.description || "");
  // }, []);

  return (
    <div className={styles.chat}>
      
    </div>
  );
}