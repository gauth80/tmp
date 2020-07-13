## Partie Crud produits 
> Create • Read • Update & Delete

## Avant propos : 
Dans un crud, create est l'insertion de données, cotée vsisiteur cela s'effectue via les formulaires, via ce contexte de fil rouge il me fallait réaliser un formulaire d'ajout pour les produits, ce formulaire n'as de portée que pour les membres du fil rouge, c'est à dire qu'aucun visiteur ne peu rajoutée de produits.

Mais avant de se lancer dans les explications du fonctionnement du model et du Controller, voici ce à quoi ressemble ce formulaire de façon générale cotée code :

### Vue du snippet Views > proAjout
```

<h3 class="text-dark col-auto h3-produits">Ajout de produits</h3>
<?= form_open_multipart('produits/create_produits', ["class" => "col-sm-12 col-lg-9 mt-2 form-produits"]); ?>
<?php validation_errors();?>

    <div class="form-group row">
        <label for="catExist" class="offset-sm-1">Choisir une catégorie *</label>
        <select name="cat_exist" id="catExist" class="form-control w-75 offset-sm-1">
            <?php foreach($cat_exist as $cat){?>
            <option value="<?php echo $cat->CAT_ID;?>"><?php echo $cat->CAT_LIBELLE;?></option>
            <?php };?>
        </select>
    </div>

    <div class="form-group row <?= empty(form_error('pro_lib')) ? '' : 'has-error';?>">
        <label for="libelle" class="offset-sm-1 col-10">Le libelle&nbsp;:&nbsp;*</label>
        <input type="text" name="pro_lib" id="libelle" class="form-control w-75 offset-sm-1" placeholder="Gipson">
        <span class="text-warning offset-sm-1"><?= form_error('pro_lib');?></span>
    </div>

    <div class="form-group row <?= empty(form_error('pro_ref')) ? '' : 'has-error';?>">
        <label for="ref" class="offset-sm-1 col-10">La ref&nbsp;:&nbsp;*</label>
        <input type="text" name="pro_ref" id="ref" class="form-control w-75 offset-sm-1" placeholder="gui000">
        <span class="text-warning offset-sm-1"><?= form_error('pro_ref');?></span>
    </div>

    <div class="form-group row <?= empty(form_error('pro_prix')) ? '' : 'has-error';?>">
        <label for="prix" class="offset-sm-1">Définir un prix&nbsp;:&nbsp;*</label>
        <input name="pro_prix" id="prix" class="form-control w-75 offset-sm-1" placeholder="99.99" min-size="0" max-size="99999.99">
        <span class="text-warning offset-sm-1"><?= form_error('pro_prix');?></span>
    </div>

    <div class="form-group row <?= empty(form_error('pro_stock')) ? '' : 'has-error';?>">
        <label for="stock" class="offset-sm-1">Entrer un stock&nbsp;:&nbsp;*</label>
        <input name="pro_stock" id="stock" class="form-control w-75 offset-sm-1" min-size="0" max-size="500" placeholder="10">
        <span class="text-warning offset-sm-1"><?= form_error('pro_stock');?></span>
    </div>

    <div class="form-group row <?= empty(form_error('pro_desc')) ? '' : 'has-error';?>">
        <label for="desc" class="offset-sm-1">Indiquez une description&nbsp;:&nbsp;*</label>
        <textarea name="pro_desc" id="desc" class="form-control w-75 offset-sm-1" min-size="0" max-size="500" placeholder="Il étais une fois.."></textarea>
        <span class="text-warning offset-sm-1"><?= form_error('pro_desc');?></span>
    </div>

    <div class="form-group row <?= empty(form_error('err_img')) ? '' : 'has-error';?>">
        <label for="stock" class="offset-sm-1">Inserez une image&nbsp;:&nbsp;*</label>
        <input type="file" name="img" id="stock" class="form-control offset-sm-1 w-75">
        <span class="text-warning offset-sm-1"><?= form_error('err_img');?></span>
    </div>

    <?= form_submit("create_pro", "Envoyez", ["class" => "btn btn-custom my-2 mx-2"], ["type" => "submit"]);?>
    <?= form_close(); ?>
    
```
### Découpons pour mieux compprendre

```
<h3 class="text-dark col-auto h3-produits">Ajout de produits</h3>
<?= form_open_multipart('produits/create_produits', ["class" => "col-sm-12 col-lg-9 mt-2 form-produits"]); ?>
<?php validation_errors();?>
<div class="form-group row">
    ... Le code du formulaires..
</div>

```

Pour commençais j'ouvre un formulaire grâce aux méthodes natif propre à PHP, réalisable aussi en HTML, multipart indique que dans le formulaire il y auras un moment donnée besoin de traitée autre chose qu'une valeur string ou number habituelle, dans le cas présent multipart gère l'importation d'une image.

Le formulaire prend en charge deux paramètres, le premier est 'produits/create_produits' qui réclâme le **Le Controller** suivit de sa méthode pour agir, le second paramètre est optionnel, il s'agit des class **CSS**.

validation_errors() est propre à Ci3 et permet entre autre d'afficher le retour d'erreur cotée client.

### Champs de selection des catégories

```
<label for="catExist" class="offset-sm-1">Choisir une catégorie *</label>
<select name="cat_exist" id="catExist" class="form-control w-75 offset-sm-1">
    <?php foreach($cat_exist as $cat){?>
        <option value="<?php echo $cat->CAT_ID;?>"><?php echo $cat->CAT_LIBELLE;?></option>
    <?php };?>
</select>

```

Ici je souhaite afficher les catégories des produits pour que l'utilisateur puisse en choisir une. Pour se faire j'utilise un **foreach** pour recherché les données corespondantes au champ libellé de la base de donnée.

**foreach** décharge toutes les données existantes du champs libellé (appelé CAT_LIBELLE) dans la base de donnée. Ce données décharger s'affiche alors dans les options et sont indexée par les id dans value. Notons que le résultat de **foreach** varies selon la requète SQL derrière, mais globalement son rôle reste le même parcourir un tableau.

### Le champs stock
*Ce champs est pris au hasard, les autres champs fonctionnent de la même manières*
```
<div class="form-group row <?= empty(form_error('pro_stock')) ? '' : 'has-error';?>">
    <label for="stock" class="offset-sm-1">Entrer un stock&nbsp;:&nbsp;*</label>
    <input name="pro_stock" id="stock" class="form-control w-75 offset-sm-1" min-size="0" max-size="500" placeholder="10">
    <span class="text-warning offset-sm-1"><?= form_error('pro_stock');?></span>
</div>

```
Je regroupe chaque **input** dans une **div** cela me permet de retournée une erreur de façon ciblée.
Dans la **div** il y as l'attribut **Class** qui prend une instruction en php, en ternaire: Si form error est vide alors rien, cela se caractérise par une chaine vide sans espacement, sinon cela retourneras le selecteur *has-error*, *has-error* est un selecteur compris par Boostrap, il possède ces propres règles de formatage, au niveau du **span** Cela fonctionne en fonction du résultat du ternaire plus haut, si cela retourne **True** alors cela afficheras un message référent au form validation de Ci3, si **False** donc aucune erreur trouver, alors rien ne s'afficheras.

Pro_stock de **name** est la valeur récupérée du **input**, c'est cette donnée cotée utilisateur qui seras traitée et peut être acheminée cotée base de données (si valide).

### Config > Form_validation

C'est cette page qui traite les formulaires cotée produit, elle fonctionne en parallèle avec une bibliotèque dans Ci3 via le system.

```
    // d'autres règles pour d'autres crud..
    
	'create' => array(
		//rx slug
		array(
			'field' => 'pro_lib',
			'label' => 'libelle',
			'rules' => 'required|min_length[1]|max_length[50]|trim|regex_match[/^[a-zA-Z0-9]+(?:\s[a-zA-Z0-9]+)*$/]'
		),

		array(
			'field' => 'pro_ref',
			'label' => 'référence',
			'rules' => 'required|min_length[3]|max_length[8]|trim|is_unique[produits.PRO_REF]|regex_match[/^[a-zA-Z]{3,4}[0-9]{3,4}$/]'
		),

		array(
			'field' => 'pro_prix',
			'label' => 'prix',
			'rules' => 'required|min_length[1]|max_length[7]|decimal|trim|regex_match[/^[0-9]{1,7}\.[0-9]{2}$/]'
		),

		array(
			'field' => 'pro_stock',
			'label' => 'stock',
			'rules' => 'required|min_length[1]|max_length[3]|alpha_numeric|integer|trim'
		),

		array(
			'field' => 'pro_desc',
			'label' => 'description',
			'rules' => 'required|min_length[8]|max_length[999]|trim|regex_match[/^[a-zA-Z0-9][^#<>-]{8,999}$/]'
		)
	),
	

```
Globalement c'est un tableau multidimentionnel regrouppant les keys et value destinée à interagir avec les formulaires cotée **Views** et le **Controller**.

Chaque tableau est associée à un champ particulier, ce moyen est propre à Ci: la Key field correspond à l'input en fonction de sa valeur **name**. La key Label est destinée aux rapport d'erreur de la cellule (la div regrouppant le champs). Enfin la Key rules définit les règles du champ.

Cette synthaxe est propre à Ci3, les OU logique ici sont interprétée de cette sorte par exemple.
Pourquoi cette façon ? Simple cela évite le gros patée de règle dans le **Controller**, morcelé le contrôle des formulaires permet aussi de le rendre modulables sur tout le site.

Enfin vous remarquerais qu'il n ' y as pas de **set_message** la raison est qu'il y as une librairy de langue française qui gère justement ces messages d'erreur cotée client, je l'ai installée en amont. Elle se base sur chacune des règles (rules) même sur les regex.

## Cotée Controller

Voila la mécanique cotée **View** as présent voici le fonctionnement cotée Controller, pour rappel le Controller fait partie d'une des couches du MCV c'est cette couche où l'on dois normalement appliquer les règles des formulaires et les redirection des pages hors routage manuel. Cette couche est en lien avec le **Model** et la **View**.

## L'objet et son immuabilitée

Avant de détaillée les Class, je pense qu'il est bon de savoir ce qu'est une Class, en po les Class permette de regroupée un enssemble de méthode et d'attribut pour un seul et même objet. C'est objet peuvent être instancier, la Class est en quelque sorte un moule de l'objet, une fois l'objet instanciée il est possibles alors d'utilisée ces méthodes et ces attributs.

Cependant un objet instanciée ne peu modifiée ces méthodes et attributs propre à sa Class de façon permanente, cette notion d'immuabilitée est propre à la Class. Ont peu modifiée parallèlement les méthodes et attribut de l'objet crée grace aux setters et mutatteur mais le moule resteras le même quoiqu'il arrive. 

L'héritage des Controller nous permet de nous servir des méthodes propres de Ci mais pas de les réecrires.

### Snippet de la Class (Controller)

```
class Produits extends CI_Controller {
    public function __construct() {
        parent::__construct();
        $this->load->model('Produits_model')
                   ->helper(array('inflector', 'form'))
                   ->library('form_validation');
    }

    /*
    * Simplement pour réduire la répétition
    * @param array [ 'donnée' => refObj->model->method() ]
    * return array
    */
    private function data($data = array() ) {
        return $data = 
            array( 'dataC' => $this->produits_model->get_produits_for_client(),
                   'data' => $this->produits_model->get_produits_for_personnal(),
                   'cat_exist' => $this->produits_model->get_categories_data()
            );
    }

```
Le constructeur permet de chargée les méthodes et attributs propre à CI_Controller mais surtout de pouvoir les instanciée à chaque nouvelle objet, *un peu comme react et ces props..*

$this pour ceci fais référence au constructeur, donc à un objet de la Class Produits.
load est propre à Ci3, cela charge assignation suivante qui est là une méthode.
model est une méthode propre à Ci3, elle permet de charger un model souhaitée entre parenthèse.

helper() et librairy() sont également des méthodes propres à Ci3 et peuvent reçevoir certain paramètres. Remarquez qu'ils n' y as pas de ; entre chaque chargement, j'utilise la patern propre de Ci3 qui est le fluent, entre autre le chainage.

La fonction est en visibilitée privée car je souhaite qu'elle ne soit pas instanciée directement par l'objet en lui même mais plutot par le biais de ces méthodes si besoin.

Cette fonction retourne un tableau contenant différentes instructions, l'idée ici étais de factorisée le code, sa peu paraître abrupt vue comme sa mais le snippet suivant permettras d' y voir plus clair.

### Snippet redirections (Controller)

```
    /*
    * Redirection
    */
    public function index() {
        $this->templates->display('produits/index', $data = self::data(array(0,2)));
    }

    public function list() {
        $this->templates->display('produits/pro_list', $data = self::data(array(1,2)));
    }

    public function ajout() {
        $this->templates->display('produits/proAjouts', $data = self::data(array(1,2)));
    }

    public function modif() {
        $this->templates->display('produits/proModif', $data = self::data(array(1,2)));
    }

    public function del() {
        $this->templates->display('produits/proDelete', $data = self::data(array(1,2)));
    }
    
    
```
Une fois encore par soucie de refactorisation j'ai fais ceci sa m'évite de réecrire du code inutile.
Le template ici nous permet de chargée de la même façon $this->load->view('views/laPage', arg).

L'argument $data demande la fonction privée, self fait référence à la Class et non à l'objet, les opérateur de liaison indique que self est associée à une fonction du nom de data(param).
En paramètre cela est un tableau contenant les key souhaitée.

En vrais il est inutile de précisée les key car fonction data retourne l'ensemble de ces keys mais, par soucie de lisibilitée j'ai préférée les laissez.


### Snippet Create (Controller)
```
// <!> create et update sont senssiblement identiques, seules les requètes cotée SQL changent.

public function create_produits() {

    if($this->input->post('create_pro')) {
            
        if($this->form_validation->run('create') == FALSE) {
            $this->ajout();
        } else {
            $config['upload_path'] = './assets/img/produits/listes/';
            $config['allowed_types'] = 'jpg|png';
            $config['max_size'] = '800000'; 
            $config['max_width'] = '2000';
            $config['max_height'] = '2000';
            $slug = url_title($this->input->post('pro_lib'), '_', true);
            $config['file_name'] = $slug;

            $this->load->library('upload', $config);
            $this->upload->initialize($config);

            if(!$this->upload->do_upload($pro_img = 'img', $slug)) {
                
                $errors = array('error' => $this->upload->display_errors());
                $this->ajout();
            } else {
                $data = array('upload_data' => $this->upload->data());
                $pro_img = substr($this->upload->data('file_ext'), 1);
                $this->produits_model->insert_produits($pro_img, $slug);
                $this->list();
            }
        }
    }
}

```

Cotée client le boutton contient un attribut name **create_pro** si ce Controller reçois via la méthode post() cette attribut alors cela renvoit à **True**.

La deuxième contition vérifie si le form_validation cotée config est lue ou non, si **False** cela retourne au formulaire d'ajout. Si **True** alors cela prend le paramètre create du form validation et vérifie que tout est en ordre, en cas d'erreur de champs de saisie le form validation retourneras l'erreur à la cellule en question cotée **View**.

Les config sont propres à la version de php > 7 pour le traitement des images. 
url_title est propre à inflector de Ci3, une librairy de réecriture d'url, d' où le slug.
Cela prend la donnée du champs de saisie, ici le libelle, si il trouve un espace alors cela ajoute un underscore permettant ainsi la lecture de l'image par la suite.

Oui le slug est basée sur le libellée du produit.
La méthode substr avec son paramètre retourne la dernière occurence de la chaine de caractère, a savoir le format de l'image, enfin si celui ci est valide selon la whitelist des config.

### Snippet delete & détail (Controller)

```
    public function delete_produits() {
        if ($this->input->post('delete_pro')) {
            $id = $this->input->post('pro_exist');
            $this->produits_model->delete_produits($id);
            $this->list();
        }
    }

    public function details($slug) {
        $detail = $this->produits_model->get_produits($slug);
        $data['detail'] = $detail;
        $this->templates->display('produits/detail', $data);     
    }
    
} // fin de la Class Produits

```
Je n'ai pas grand chose à dire pour ces deux méthodes là, à part que détails prend en paramètre le slug.
Pour moi avoir le nom du produit en url est plus parlant qu'un chiffre.

## Le model du produits
Le **Model** est la dernière couche du MVC, elle est en lien avec le **Controller** uniquement niveau serveur et est en relation avec la base de donnée. On peu mettre en relation le **Model** avec la vue cependant on ne respecte plus forcement le patron de conception qu'est le MVC mais cela se fait dans de rare exception, de souvenir l'import d'une module::method() dans une vue en est un exemple.

### Snippet de la Class (Model)

```
class Produits_model extends CI_Model {
	public function __construct() {
		$this->load->database();
	}

	public function get_produits_for_client() {
		$this->db->order_by('produits.PRO_ID', 'DESC')
			 ->join('categorie', 'categorie.CAT_ID = produits.CAT_ID')
			    //aff produits si diff de 0
			 ->having('PRO_STOCK_PHYSIQUE != 0');
		$query = $this->db->get('produits');
		return $query->result();
	}

	public function get_produits_for_personnal() {
		$this->db->order_by('produits.PRO_ID', 'DESC');				  
		$query = $this->db->get('produits');
		return $query->result();
	}
	
```
Comme le **Controller** le **Model** hérite des méthodes et attributs de Ci3. Ainsi on retrouve un constructeur(). Et une nouvelle méthode s'occupant de l'instance de connexion à la base de donnée, sans elle impossible de chargée les données.

Les deux fonctions sont simulaires à quelque degrès près l'une charge les produits qu'en fonction du stock existant, tandis que l'autres charge tout les produits existant cotée administration.

Codeigniter et sa patern Fluent permet se chaînage des requètes les une après les autres, les méthodes sont en général assez parlante pour leurs utilisations, en revanche il est bon de précisée que result() retourne un enssemble de données saisie selon le query et non une ligne comme le voudrais la méthode row().

### La méthode Update (Model)
Elle aussi est plus ou moins identique que Create, mais pour évitée les conflits avec cette dernière j'ai juger utile de la réecrire.

```
	public function update_produits($pro_img, $slug) {

        $data = array(
			'PRO_LIBELLE' => $this->input->post('pro_lib'),
			'PRO_REF' => $this->input->post('pro_ref'),
			'PRO_DESCRIPTION' => $this->input->post('pro_desc'),
			'PRO_PRIX_ACHAT' => $this->input->post('pro_prix'),
			'PRO_STOCK_PHYSIQUE' => $this->input->post('pro_stock'),
			'CAT_ID' => $this->input->post('cat_exist'),
			'PRO_SLUG' => $slug,
			'PRO_PHOTO' => $pro_img
            );

            $this->db->where('PRO_ID', $this->input->post('pro_exist'));
            return $this->db->update('produits', $data);
	}
	
```
Les deux fonctions ont les même paramètres, ces paramètres recupères les données saisie et controler niveau **Controller** et sont acheminée dans le tableau en fonction de leurs index.

Les index ici sont en référence aux noms des tables de données, cela n'est réalisable qu'avec la méthode du constructeur qui connecte le **Model** à la base de donnée.

Ainsi ont peu indiquée $this->db->where('index/key', $ceci->target->method('name'));
input n'est qu'une méthod de Ci3 mais dans ce contexte une balise html, cette balise on lui demande de récupérée ces données, pour ce faire car après tout cela peu ciblé n'importe quel balise dans ce cas, il faut précisée l'attribut name en question (pro_exist ici).

Enfin, une fois les données récupérée, on retourne l'update en spécifiant bien le nom de la table, et se que l'on y retournée ($data).

### Delete, les catégories et le détail (Model)

```
	public function delete_produits($id) {
        $this->db->where('PRO_ID', $this->input->post('pro_exist'));
        $this->db->delete('produits');
        return true;
	}

	public function get_categories_data() {
		
		$this->db->select('*')
				 ->order_by('CAT_ID', 'ASC');
		$query = $this->db->get('categorie');
		return $query->result();
	}

	public function get_produits($slug) {
		$detail = $this->db->select('*')->from('produits')->join('categorie', 'produits.CAT_ID = categorie.CAT_ID')->where('PRO_SLUG', $slug)->get();
		return $detail->row();

	}

} // Fin de la Class Produits_model

```
La fonction delete fonctionne avec l'id des produits, cotée **View** le formulaire l'id est indiquée dans les options d'une downdroplist (balisage select et options), il passe en paramètre également dans le **Controller** puis passe de nouveau dans le **Model** pour être compris, une fois selectionnée dans le query delete, on retourne **True** pour validée l'action.

Cotée fonction catégories je retourne simplement la table catégorie en question dans l'ordre alphabétique.

Enfin pour le détail, $détail contient la requète SQL et je retourne simplement la rangée du produit avec row(). Cette requète etant attribuée à la variable $détail, cotée **Controller** comme **View** je peu aussi la déployée, bien que déprécier.

## View produits cotée visiteur
```
<section class="row py-5">
  <div class="wrap-produits my-5 row">
	<?php foreach ($dataC as $pro) { ?>
	  <div class="card my-5 mx-auto">
		<div class="face revers1">
		  <div class="contenue text-center">
			<img class="img-fluid" src="<?php echo base_url() ;?>assets/img/produits/listes/<?php echo $pro->PRO_SLUG;?>.<?php echo $pro->PRO_PHOTO;?>" alt="<?php echo $pro->PRO_LIBELLE ;?>">
			<h3><?php echo $pro->PRO_LIBELLE ;?></h3>
		 </div>
	    </div>
		<div class="face revers2">
		  <div class="contenue">
			<p>Produits disponible&nbsp;:&nbsp;<?php echo $pro->PRO_STOCK_PHYSIQUE ;?></p>
			<p><em><?php echo word_limiter($pro->PRO_DESCRIPTION,15) ;?></em></p>
			<p><u>REF</u>&nbsp;:&nbsp;<?php echo $pro->PRO_REF ;?></p>
			<a href="<?php echo site_url('/produits/details/').$pro->PRO_SLUG ;?>" class="btn">Lire plus</a>
			<p class="price"><?php echo $pro->PRO_PRIX_ACHAT ;?>&nbsp;€</p>
		  </div>
		</div>
	  </div>
	<?php } ;?>
  </div>
</section>

```
Snippet de la page produit, désoler pour l'indentation le markdown ne calcule pas les espaces comme souhaitée.







