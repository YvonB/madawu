<?php
/**
 * La configuration de base de votre installation WordPress.
 *
 * Ce fichier contient les réglages de configuration suivants : réglages MySQL,
 * préfixe de table, clés secrètes, langue utilisée, et ABSPATH.
 * Vous pouvez en savoir plus à leur sujet en allant sur
 * {@link http://codex.wordpress.org/fr:Modifier_wp-config.php Modifier
 * wp-config.php}. C’est votre hébergeur qui doit vous donner vos
 * codes MySQL.
 *
 * Ce fichier est utilisé par le script de création de wp-config.php pendant
 * le processus d’installation. Vous n’avez pas à utiliser le site web, vous
 * pouvez simplement renommer ce fichier en "wp-config.php" et remplir les
 * valeurs.
 *
 * @package WordPress
 */

// ** Réglages MySQL - Votre hébergeur doit vous fournir ces informations. ** //
/** Nom de la base de données de WordPress. */
define('DB_NAME', 'madawu_db');

/** Utilisateur de la base de données MySQL. */
define('DB_USER', 'root');

/** Mot de passe de la base de données MySQL. */
define('DB_PASSWORD', '');

/** Adresse de l’hébergement MySQL. */
define('DB_HOST', 'localhost');

/** Jeu de caractères à utiliser par la base de données lors de la création des tables. */
define('DB_CHARSET', 'utf8mb4');

/** Type de collation de la base de données.
  * N’y touchez que si vous savez ce que vous faites.
  */
define('DB_COLLATE', '');

/**#@+
 * Clés uniques d’authentification et salage.
 *
 * Remplacez les valeurs par défaut par des phrases uniques !
 * Vous pouvez générer des phrases aléatoires en utilisant
 * {@link https://api.wordpress.org/secret-key/1.1/salt/ le service de clefs secrètes de WordPress.org}.
 * Vous pouvez modifier ces phrases à n’importe quel moment, afin d’invalider tous les cookies existants.
 * Cela forcera également tous les utilisateurs à se reconnecter.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'cya<:cnUw|8To5fl8.Or?-?3)wlXB8&b6A[dr]W5w+FU.R<-]w;K|5;Up4k#jyp_');
define('SECURE_AUTH_KEY',  'O{7U(Dj5wpqe |)11OOTQGd=({pzi{I4O[R)j07,zjHr6(RS{!d@z=B{rHYvT.7z');
define('LOGGED_IN_KEY',    'oT:xd8-HOP7j]mV q {3iAtLl X-zf|GC>4joMPv6B#^W;HmeH,lXm8s[9q)uj,5');
define('NONCE_KEY',        '49n%|TT2msw4(5&x{IOkl]fxf|O%tsp mY$9/7-EGfZ;xyZX5W&G4`$L,#(ma:Hb');
define('AUTH_SALT',        ')Jt Fl0n;X{Vd2c_$46]7m+&.$x-txL:_UkdDE2}V0*K,^rw/GI(_jfjh*(5~R{g');
define('SECURE_AUTH_SALT', '9y@K^f]AfWA@=H;`&?XhUXWw.p!W1h<jG2Y/Aj#aeA1E[c9EqN={rMjUF*i::hH{');
define('LOGGED_IN_SALT',   ' i+Vy=lj;a|G QW!vCSth-a?wuN^]n_p*`PmY)fW<F2$}lH;4mCF}O7YJdBL!AF[');
define('NONCE_SALT',       'A6dM9//E&J*|+$0KzU0IUn<NrzIDF?NW@;}58`UHl_&,8YF[4u*N]mT@6G2A A^7');
/**#@-*/

/**
 * Préfixe de base de données pour les tables de WordPress.
 *
 * Vous pouvez installer plusieurs WordPress sur une seule base de données
 * si vous leur donnez chacune un préfixe unique.
 * N’utilisez que des chiffres, des lettres non-accentuées, et des caractères soulignés !
 */
$table_prefix  = 'mwu_';

/**
 * Pour les développeurs : le mode déboguage de WordPress.
 *
 * En passant la valeur suivante à "true", vous activez l’affichage des
 * notifications d’erreurs pendant vos essais.
 * Il est fortemment recommandé que les développeurs d’extensions et
 * de thèmes se servent de WP_DEBUG dans leur environnement de
 * développement.
 *
 * Pour plus d’information sur les autres constantes qui peuvent être utilisées
 * pour le déboguage, rendez-vous sur le Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* C’est tout, ne touchez pas à ce qui suit ! */

/** Chemin absolu vers le dossier de WordPress. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Réglage des variables de WordPress et de ses fichiers inclus. */
require_once(ABSPATH . 'wp-settings.php');