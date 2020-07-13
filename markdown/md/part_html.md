## Partie Html du fil rouge
Il y as peu d'exemple car la plupart des snippets sont basiques.

### Les métadonnées

Les métadonnées sont des données importantes pour un site, ils en existe de toutes sortes selon l'envirronement de développement, sur un envirronement sans auto-chargement c'est à dire sans bundle cela ne comporte qu'une dizaine de meta déployable, le reste est bien souvent déprécier selon Mozilla.

Les attributs des meta, les scripts et link varies aussi selon la techno utilisée, sur **react** par exemple il est possible de choisir si le script soit synchrone ou non ou si il dois être chargée à la fin. En fonction des cas il faut savoir quoi mettre en premier plan car l'ordre à son importance dans l'en-tête.

En principe se sont les meta que l'ont place en premier, suivit des cnd puis les scripts ou link appartenant aux projets.

```
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="description" content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor eos voluptatem sit quasi fugit reiciendis repudiandae at placeat optio quos minima aspernatur nobis corrupti ea nostrum, voluptas modi veritatis! Accusantium, cumque neque quasi voluptas facilis esse omnis laboriosam quo commodi placeat maxime eius incidunt praesentium ullam quia dolore, tempore doloremque.."/>
    <link rel="stylesheet" href="<?php echo base_url("assets/css/")."bootstrap.min.css";?>">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.0/css/bootstrap.min.css">
    <link rel="icon" type="image/png" href="<?php echo base_url("assets/img/favicon-min.png");?>" />
    <link rel="stylesheet" href="<?php echo base_url("assets/css/")."style.css";?>">
    <title>v green</title>
</head>

```
La première metadonnées est celle de l'encodage. Elle indique aux navigateurs la racine de la langue employée, ici c'est utf-8: la racine de cette encodage regroupe entre autres les langues européennes et ces acçents.

La seconde meta est optionnelle, elle indique au navigateur comment il dois se comportée lors d'un affichage mobile, initial-scale à 1 pouce, plus l'indice est faible, plus le site s'agrandiras cotée mobile par exemple.

La troisième meta est aussi optionnelle, cela indique à l'agent utilisateur du navigateur qu'internet explorer est égal à edge. Ainsi ie6 ~ ie8 possèderas alors les mêmes règles **SCSS** qu'edge en théorie.

La quatrième meta est aussi optionnelle mais fortement consseiller pour le référencement naturel du site (SEO). Il s'agit de la description du site visible par le client lors de sa recherche sur le web.
Google autorise 155 à 255 caractères pour un audit max.

*Le premier link ici ne sert qu'a moi, en général je l'éfface, c'est si je n'est pas de connexion aux moins j'ai la grille de Boostrap pour bosser ^^.*

Le second link est le seul link de Bootstrap normalement, l'avantage de passer par un cdn c'est que l'on gagne en référencement, pourquoi ? Car les standards de Boostrap respecte les règles établie par W3C.

Le troisième link, est le link secondaire, pour les mises en page manuelle du site.

Enfin la balise Title sert à donnée un nom à l'onglet de la page web, bien qu'optionnel elle est fortement recommandée.

### Le header (Layouts)
*Notée qu'au moment où j'écris ce diapo je pense sincérement recommençais ce header, fonctionnel mais bien trop volumineux (profondeur du DOM)*



```html
<body class="container root" style="background:url('<?php echo base_url('assets/img/accueil/background_village.png');?>')">
    <div class="wrap m-0 p-0">
        <header class="col-12 px-0">
            <div class="container p-0">
                <div class="col-12 p-0">
                    <div class="row m-0 d-bk" style="background:url('<?php echo base_url('assets/img/header/3_bandes.png');?>');">
                        <figure class="col-md-2 col-lg-2 d-none d-md-block p-0 ">
                            <a class="navbar-brand" href="<?php echo base_url();?>" title="Vers l'accueil de Village Green">
                                <img class="d-inline-blocks" src="<?= base_url('assets/img/header/').'logo_village_green.png'?>" alt="logo de l'entreprise village green" title="logo">
                            </a>
                        </figure>
                        <div class="col-md-9 col-xs-12 p-0 ml-auto d-sm-none d-sm-block">
                            <!--première nav-->
                            <nav class="navbar navbar-expand-sm firstNav px-0 py-0">
                                <span class="d-sm-none title-nav-service mr-auto pl-4">Rubrique Client</span>
                                <a class="navbar-brand" href=""></a>
                                <button class="navbar-toggler mr-2 my-2 c-icon-button" type="button" data-toggle="collapse" data-target="#target1" aria-controls="target1" aria-expanded="false" aria-label="Toggle navigation">
                                    <span class="navbar-toggler-icon c-icon"></span>
                                </button>
                                <div class="collapse navbar-collapse pl-0" id="target1">
                                    <ul class="navbar-nav ml-auto pt-3 mr-2">
                                        <li class="nav-item active col-xs-3">
                                            <?= anchor('structure/other/info/#info', "Info", ["class" => "nav-link pl-4"]);?>
                                        </li>
                                        
```

Pour réaliser le header, je suis partie dans la logique qu'il me fallais trois navigations responsive aux possibles je suis donc partie sur trois composants hamburger de Boostrap. Les images sont charger par attribut directement depuis les balises car avec l'architecture du MVC il étais plus conplexe de réalisée cela, en gros pour afficher les images cotée **CSS** il aurais fallut que je fasse un style.php et faire de PHP un préprocesseur, se qui est possible avec apache mais plus facile à dire qu' a réaliser, second contexte j'aurais pus passer par **SASS** mais une fois encore je ne maitrise pas assez cette techno pour de telle prouesse.

L'ancre formatée par PHP est la seule façon que j'ai trouver pour réaliser une ancre dynamique, c'est à dire qu'en fonction du **Controller** et de sa redirection je peu dirigée le visiteur à l'endroit souhaitée. Cela se décris de cette façon Class/method/arg/ancre, "nom du link", ["class css"].


### Snippet Accueil (View)
*Code img cassée volontairement pour le markdown, fonctionnement inchangée*
```html

    <div class="row my-4 section-categories">
        <figure class="col-sm-6 col-lg-4 text-center col-xl-3 py-0 px-0">
            <a class="ventes-link" href="<?php echo site_url("produits/list");?>">
                <img src="<?php echo base_url('assets/img/produits/cat_gui.png'); ?>" 
                    onmouseover="this.src='assets/img/wrapper/cat_h_gui.png'"
                    onmouseout="this.src='assets/img/produits/cat_gui.png'"
                    title="catégorie guitare" alt="catégorie guitare" class="thumbnail">
            </a>
        </figure>
        
        <!-- Autre cellule contenant le même code..-->
    </div>
    
```
Rare utilisation de **JavaScripts** ici où je souhaite changer d'état une image. onmouseout et onmouseover sont des méthodes propre à **JS**, this fais référence au seul objet associée ici présent l'état entre autre, on lui concatènne (ajoute/aditionne) l'attribut src pour source qui réclâme alors un path. De cette façon en fonction de l'état on obtient les images que l'ont souhaites.


## Hors fil rouge
### Une autre variétée inspirée de l'html
Le Pug ou Jade est un **Template** semblable à l'HTML si ce n'est que celui ci peut être dynamique. Contrairement au Javascript, CSS et HTML, le Pug à besoin d'être compilée pour être lisible cotée navigateur de la même manière que l'on compiles du SCSS en CSS. Ce **Template** permet entre d'effectuée des boucles, des mixins (des sortes de Class) et encore d'importée des variables et des comportement en **Javascripts** directement sur l'HTML.

```

doctype html
  head
    meta(charset=utf-8)
    link(rel="stylesheet", href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css", integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk", crossorigin="anonymous")
  
  body.container.bg-dark
    section.row.col-12.my-3
      h3.text-left.text-primary.col-12 Exemple de Pug (ancienement Jade)
      article.col-5.bg-info.rounded
        p.py-2.pl-2 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea, molestiae asperiores provident, facilis amet, error unde aliquid blanditiis saepe vel eius nobis, sed itaque reprehenderit expedita sapiente ut. Soluta, ad.
      article.col-5.offset-1.bg-success.rounded
        p.py-2.pl-2 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea, molestiae asperiores provident, facilis amet, error unde aliquid blanditiis saepe vel eius nobis, sed itaque reprehenderit expedita sapiente ut. Soluta, ad.
    nav.nav
      ul.navbar
      each value in ['html','css','Js']
        li.nav-link
          a(href="../unLink/quelquePart/page.pug", class="nav-brand")= value
          
```
*Note: Je suis passer sous Jsbin pour cette exemple, d'où la précision de l'encodage.*

Ce genre de synthaxe ne laisse pas de place aux erreurs, le moindre espace manquant fait plantée l'ensemble du script.

L'Soucie de ce langage est qu'il compris par pratiquement aucun Ide actuellement et peu rechercher.
Sur NodeJs, il faut préçisée le moteur de template en amont pour générée des pages, c'est de cette façon que j'ai découvert le **Pug**.

### PHP peu génrée aussi des balises html

Sur certain Snippet on peu aperçevoir
```
<?= form_open_multipart('produits/create_produits', ["class" => "col-sm-12 col-lg-9 mt-2 form-produits"]); ?>

<?php validation_errors();?>

<?= form_submit("create_pro", "Envoyez", ["class" => "btn btn-custom my-2 mx-2"], ["type" => "submit"]);?>

<?= form_close(); ?>

<?= anchor('structure/other/propos/#propos', "As propos", ["class" => "nav-link pl-4"]);?>


```
Il existe encore bien plus de méthode pouvant interprétée des balises Html, en général en opteras pour de simple balise Html, mais dans des cas particuliers cette méthode de balisage est forte utile, pour ma part sans sa, je n'aurais jamais pus réalisée des ancres tout en respectant le MVC, car il fallais que je prenne en conssidération les résultats des méthodes cotée Controller, là où l'HTML classique ne peu l'influençée.


### Cotée React
Je ne peu trop m'avançée sur ce sujet, j'étudie React en ce moment comme je continue le site (il y as toujours quelques choses à faire, à rectifiée..) 

Cotée React donc, l'HTML peu varier aussi si l'ont fais des composants par exemple les attributs **Class** deviennent **ClassName**, l'attribut **for** des balises label sont désormais **htmlFor**, enfin les balises doivent être auto-fermante chose non systématique dans l'HTML. 






