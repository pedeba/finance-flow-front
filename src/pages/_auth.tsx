import { createFileRoute, Outlet } from '@tanstack/react-router'
import styles from './_auth.module.css'

export const Route = createFileRoute('/_auth')({
  component: AuthLayout,
})

function AuthLayout() {
  const features = [
    'Acompanhe receitas e despesas',
    'Relatórios detalhados',
    'Metas financeiras personalizadas',
  ]

  return (
    <div className={styles.container}>
      {/* Lado esquerdo - Branding */}
      <aside className={styles.brandingSide}>
        {/* Padrão decorativo */}
        <div className={styles.pattern} />
        
        {/* Círculos decorativos */}
        <div className={styles.circleTop} />
        <div className={styles.circleBottom} />

        {/* Conteúdo do branding */}
        <div className={styles.brandingContent}>
          {/* Logo/Ícone */}
          <div className={styles.logoBox}>
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>

          <h1 className={styles.brandTitle}>Finance Flow</h1>
          <p className={styles.brandSubtitle}>
            Controle suas finanças de forma inteligente e simplificada
          </p>

          {/* Features */}
          <ul className={styles.featureList}>
            {features.map((feature, i) => (
              <li key={i} className={styles.featureItem}>
                <span className={styles.featureIcon}>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="3"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Lado direito - Formulário */}
      <main className={styles.formSide}>
        <div className={styles.formContainer}>
          {/* Logo mobile */}
          <div className={styles.mobileLogo}>
            <div className={styles.mobileLogoBox}>
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <h2 className={styles.mobileTitle}>Finance Flow</h2>
          </div>

          {/* Área do formulário */}
          <div className={styles.formCard}>
            <Outlet />
          </div>

          {/* Footer */}
          <p className={styles.footer}>
            © {new Date().getFullYear()} Finance Flow. Todos os direitos reservados.
          </p>
        </div>
      </main>
    </div>
  )
}
