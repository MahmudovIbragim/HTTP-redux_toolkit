import scss from "./HomePage.module.scss";
import { UseAppDispach, useAppSelector } from "../../../redux/store";
import { useEffect, useState } from "react";
import {
  deleteRequest,
  getRequest,
  postRequest,
  upDateData,
} from "../../../redux/tools/youTubeSlice";
import Modal from "../modal/Modal";

interface Content {
  _id: number;
  filtres: string;
  title: string;
  image: string;
  iframe: string;
}

const HomePage = () => {
  const contentData: Content[] = useAppSelector(
    (state) => state.reducerMovie.data
  );
  const dispatch = UseAppDispach();
  const [filters, setFilters] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [iframe, setIframe] = useState<string>("");
  const [select, setSelect] = useState<string>("all");
  const [openModal, setOpenModal] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [isModal, setIsModal] = useState<Content | null | any>(null);
  const [cardId, setCardId] = useState<number | null>(null);
  const [newName, setNewName] = useState<string>("");
  const [newImage, setNewImage] = useState<string>("");
  const [newIframe, setNewIframe] = useState<string>("");
  const [newFilters, setNewFilters] = useState<string>("");

  const modalOpen = (item: Content) => {
    setIsModal(item);
    setOpenModal(true);
  };

  const onClose = () => {
    setOpenModal(false);
    setIsModal(null);
  };

  const handleAddContent = () => {
    if (name === "" || image === "" || iframe === "" || filters === "") {
      alert("Заполни пустые поли");
    } else {
      const newData = {
        filtres: filters,
        title: name,
        image: image,
        iframe: iframe,
      };
      dispatch(postRequest(newData));
    }
    setFilters("");
    setName("");
    setImage("");
    setIframe("");
  };
  const deleteItemContent = (id: number) => {
    dispatch(deleteRequest(id));
  };

  const saveData = (id: number) => {
    dispatch(
      upDateData({
        id,
        title: newName,
        image: newImage,
        iframe: newIframe,
        filtres: newFilters,
      })
    );
    setCardId(null);
  };

  useEffect(() => {
    dispatch(getRequest());
  }, [dispatch]);

  return (
    <div className={scss.HomePage}>
      <div className="container">
        <div className={scss.Content}>
          <div className={scss.content_box}>
            <div className={scss.form}>
              <input
                type="text"
                placeholder="Title"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
              <input
                type="text"
                placeholder="Video"
                value={iframe}
                onChange={(e) => setIframe(e.target.value)}
              />
              <input
                type="text"
                placeholder="select"
                value={filters}
                onChange={(e) => setFilters(e.target.value)}
              />
              <select
                value={select}
                onChange={(e) => setSelect(e.target.value)}
              >
                <option value="content">Contents</option>
                <option value="movies">Movies</option>
                <option value="music">Music</option>
                <option value="games">Games</option>
              </select>
              <button onClick={handleAddContent}>addcontent</button>
            </div>
            <div className={scss.rendering}>
              {contentData.map((item) =>
                item.filtres === select ? (
                  <>
                    <div className={scss.card} key={item._id}>
                      {cardId === item._id ? (
                        <div className={scss.newForm}>
                          <input
                            type="text"
                            placeholder="Title"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                          />
                          <input
                            type="text"
                            placeholder="Image"
                            value={newImage}
                            onChange={(e) => setNewImage(e.target.value)}
                          />
                          <input
                            type="text"
                            placeholder="Video"
                            value={newIframe}
                            onChange={(e) => setNewIframe(e.target.value)}
                          />
                          <input
                            type="text"
                            placeholder="Video"
                            value={newFilters}
                            onChange={(e) => setNewFilters(e.target.value)}
                          />
                          <div className={scss.newForm_btn}>
                            <button onClick={() => setCardId(null)}>
                              cancel
                            </button>
                            <button onClick={() => saveData(item._id)}>
                              Save
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <img
                            onClick={() => modalOpen(item)}
                            src={item.image}
                            alt="image"
                          />
                          <p>{item.title}</p>
                          <Modal isOpen={openModal} onClose={onClose}>
                            {isModal && (
                              <>
                                <div className={scss.info}>
                                  <h1>Приятного Прасмотра😍</h1>
                                </div>
                                <iframe
                                  allowFullScreen
                                  src={isModal.ifream}
                                ></iframe>
                                <h2>{isModal.title}</h2>
                              </>
                            )}
                          </Modal>
                          <div className={scss.card_btn}>
                            <button onClick={() => deleteItemContent(item._id)}>
                              delete
                            </button>
                            <button
                              onClick={() => {
                                setCardId(item._id);
                                setNewName(item.title);
                                setNewImage(item.image);
                                setNewIframe(item.iframe);
                                setNewFilters(item.filtres);
                              }}
                            >
                              edit
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </>
                ) : null
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
