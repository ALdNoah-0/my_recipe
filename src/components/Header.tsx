import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetCategoriesQuery, useGetCuisinesQuery } from '../redux/mealApi';
import '../styles/Header.css';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const headerRef = useRef<HTMLElement>(null);
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [openMenu, setOpenMenu] = useState<'categories' | 'cuisines' | null>(null);
  const [isInHeroSection, setIsInHeroSection] = useState(false);

  const { data: categoriesData } = useGetCategoriesQuery();
  const { data: cuisinesData } = useGetCuisinesQuery();
  const activeParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const activeCategory = activeParams.get('category') ?? 'All';
  const activeCuisine = activeParams.get('cuisine') ?? 'All';

  const categoryOptions = useMemo(() => {
    const categories = categoriesData?.meals?.map((item) => item.strCategory).filter(Boolean) ?? [];
    return ['All', ...Array.from(new Set(categories)).sort((left, right) => left.localeCompare(right))];
  }, [categoriesData]);

  const cuisineOptions = useMemo(() => {
    const cuisines = cuisinesData?.meals?.map((item) => item.strArea).filter(Boolean) ?? [];
    return ['All', ...Array.from(new Set(cuisines)).sort((left, right) => left.localeCompare(right))];
  }, [cuisinesData]);

  const isHomeRoute = location.pathname === '/';
  const headerSubtitle = 'Browse categories, cuisines, and meal ideas';

  useEffect(() => {
    if (!isHomeRoute) {
      setIsInHeroSection(false);
      return;
    }

    const heroElement = document.getElementById('home-hero');
    if (!heroElement) {
      setIsInHeroSection(false);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInHeroSection(entry.isIntersecting);
        });
      },
      {
        threshold: 0,
        rootMargin: '0px 0px 0px 0px',
      }
    );

    observer.observe(heroElement);

    return () => {
      observer.disconnect();
    };
  }, [isHomeRoute]);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setIsNavExpanded(false);
        setOpenMenu(null);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, []);

  const closeMenus = () => {
    setIsNavExpanded(false);
    setOpenMenu(null);
  };

  const navigateTo = (path: string) => {
    closeMenus();

    if (path === '/' && isHomeRoute) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    navigate(path);
  };

  const openRecipeRoute = (filterKey: 'category' | 'cuisine', value: string) => {
    const params = new URLSearchParams(location.search);

    if (value === 'All') {
      params.delete(filterKey);
    } else {
      params.set(filterKey, value);
    }

    const query = params.toString();
    navigateTo(query ? `/recipe?${query}` : '/recipe');
  };

  const toggleMenu = (menu: 'categories' | 'cuisines') => {
    setOpenMenu((current) => (current === menu ? null : menu));
  };

  return (
    <header
      ref={headerRef}
      className={`recipe-navbar navbar navbar-expand-lg navbar-dark ${
        isHomeRoute && isInHeroSection ? 'recipe-navbar--transparent' : 'recipe-navbar--solid'
      } ${isHomeRoute && isInHeroSection ? 'recipe-navbar--home-hero' : ''}`}
    >
      <div className="container-fluid recipe-navbar__inner">
        <button type="button" className="navbar-brand recipe-brand" onClick={() => navigateTo('/')}>
          <img src="/favicon.svg" alt="main_icon" className="recipe-brand__icon" aria-hidden="true" />
          <span className="recipe-brand__text">
            <span className="recipe-brand__title">Recipe Explorer</span>
            <span className="recipe-brand__subtitle">{headerSubtitle}</span>
          </span>
        </button>

        <button
          className="navbar-toggler recipe-navbar__toggler"
          type="button"
          aria-controls="recipeNavbarNav"
          aria-expanded={isNavExpanded}
          aria-label="Toggle navigation"
          onClick={() => setIsNavExpanded((current) => !current)}
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className={`collapse navbar-collapse recipe-navbar__collapse ${isNavExpanded ? 'show' : ''}`} id="recipeNavbarNav">
          <ul className="navbar-nav ms-lg-auto align-items-lg-center recipe-navbar__nav">
            <li className="nav-item">
              <button type="button" className="nav-link recipe-nav-link" onClick={() => navigateTo('/')}>
                Home
              </button>
            </li>

            <li className={`nav-item dropdown recipe-dropdown ${openMenu === 'categories' ? 'show' : ''}`}>
              <button
                type="button"
                className="nav-link recipe-nav-link dropdown-toggle recipe-dropdown-toggle"
                aria-expanded={openMenu === 'categories'}
                aria-haspopup="true"
                onClick={() => toggleMenu('categories')}
              >
                Categories
              </button>
              <div className={`dropdown-menu recipe-dropdown-menu recipe-dropdown-menu--categories ${openMenu === 'categories' ? 'show' : ''}`}>
                <div className="recipe-dropdown-menu__heading">All Categories</div>
                <div className="recipe-dropdown-list recipe-dropdown-list--single">
                  {categoryOptions.map((category) => (
                    <button
                      key={category}
                      type="button"
                      className={`dropdown-item recipe-dropdown-item ${activeCategory === category ? 'recipe-dropdown-item--selected' : ''}`}
                      onClick={() => openRecipeRoute('category', category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </li>

            <li className={`nav-item dropdown recipe-dropdown recipe-dropdown--cuisines ${openMenu === 'cuisines' ? 'show' : ''}`}>
              <button
                type="button"
                className="nav-link recipe-nav-link dropdown-toggle recipe-dropdown-toggle"
                aria-expanded={openMenu === 'cuisines'}
                aria-haspopup="true"
                onClick={() => toggleMenu('cuisines')}
              >
                Cuisines
              </button>
              <div className={`dropdown-menu recipe-dropdown-menu recipe-dropdown-menu--cuisines ${openMenu === 'cuisines' ? 'show' : ''}`}>
                <div className="recipe-dropdown-menu__heading">Explore cuisines</div>
                <div className="recipe-cuisine-grid">
                  {cuisineOptions.map((cuisine) => (
                    <button
                      key={cuisine}
                      type="button"
                      className={`dropdown-item recipe-dropdown-item recipe-dropdown-item--grid ${activeCuisine === cuisine ? 'recipe-dropdown-item--selected' : ''}`}
                      onClick={() => openRecipeRoute('cuisine', cuisine)}
                    >
                      {cuisine}
                    </button>
                  ))}
                </div>
              </div>
            </li>

            <li className="nav-item">
              <button type="button" className="nav-link recipe-nav-link" onClick={() => navigateTo('/ingredient-planner')}>
                Ingredient Planner
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
