import React, {FC, Fragment, RefObject, useRef} from 'react';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-ingredients.module.css'
import BurgerIngredient from "../burger-ingredient/burger-Ingredient";
import {useSelector} from "react-redux";

interface Tab {
  value: number,
  label: string,
  type: string,
  ref: RefObject<HTMLParagraphElement>
}

const BurgerIngredients: FC = () => {
  const ingredientsRef = useRef<HTMLDivElement>(null);

  // @ts-ignore
  const listIngredients = useSelector((state) => state.ingredients);

  // Категории ингредиентов
  const tabs: Tab[] = [
    {value: 1, label: 'Булки', type: 'bun', ref: useRef<HTMLParagraphElement>(null)},
    {value: 2, label: 'Соусы', type: 'sauce', ref: useRef<HTMLParagraphElement>(null)},
    {value: 3, label: 'Начинки', type: 'main', ref: useRef<HTMLParagraphElement>(null)},
  ];

  const [currentTab, setCurrentTab] = React.useState(tabs[0].value);

  // Скрол при клике по табу
  const handleTabClick = (tab: Tab) => {
    setCurrentTab(tab.value);

    // Прокрутка к нужному ref
    if (tab.ref.current) {
      tab.ref.current.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  //Смена tab при скроле пользователем
  React.useEffect(() => {
    const handleScroll = () => {
      // Найдем видимую категорию
      const visibleTab = tabs.find((tab) => {
        const tabRef = tab.ref.current;
        return (
          tabRef && ingredientsRef && ingredientsRef.current &&
          tabRef.getBoundingClientRect().top <= ingredientsRef.current.getBoundingClientRect().top &&
          tabRef.getBoundingClientRect().bottom > ingredientsRef.current.getBoundingClientRect().top
        );
      });

      // Обнови текущую видимую категорию
      if (visibleTab) {
        setCurrentTab(visibleTab.value);
      }
    };

    ingredientsRef?.current?.addEventListener('scroll', handleScroll);

    return () => {
      ingredientsRef?.current?.removeEventListener('scroll', handleScroll);
    };
  }, [tabs]);

  return (
    <section className={styles.section} aria-label="Бургер ингредиенты">
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <div className={styles.tab}>
        {tabs.map((tab) => (
          <Tab
            key={tab.value}
            value={tab.label}
            active={currentTab === tab.value}
            onClick={() => {
              handleTabClick(tab)
            }}
          >
            {tab.label}
          </Tab>
        ))}
      </div>

      <div className={styles.ingredients + ' custom-scroll'} ref={ingredientsRef}>
        {
          tabs.map(tab => {
            return (
              <Fragment key={tab.value}>
                <p className="text text_type_main-medium mt-10 mb-6" ref={tab.ref}>{tab.label}</p>
                <div className={styles.list + ' ml-4'}>
                  {listIngredients && listIngredients.map((element: any) => {
                    if (element.type === tab.type) {
                      return (
                        <BurgerIngredient
                          key={element._id}
                          element={element}
                        />
                      );
                    }

                    return null;
                  })}
                </div>
              </Fragment>
            )
          })
        }
      </div>
    </section>
  );
}

export default BurgerIngredients;
