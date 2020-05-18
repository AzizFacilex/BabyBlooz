namespace BabyBlooz.DB.Entities
{
    public interface IEntity<T>
    {
        string Id{get;set;}
        T AddErrors(object c);
    }
}